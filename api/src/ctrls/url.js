const
    crypto          = require('crypto'),
    fileType        = require('file-type'),
    {Storage}       = require('@google-cloud/storage'),
    request         = require('request'),
    {URL}           = require('url'),
    { MAX_FILE_SIZE,
     GC_STORAGE }   = require('../common/constants'),
    errors          = require('../common/errors'),
    {log, logdev}   = require('../common/logging'),
    utils           = require('../common/utils');

/**
    Only accept application/json. No binary, no raw.
    Required option:
        - url: Url of image file.
**/
/**
    ALGORITHM
    ---------
    1. Get url and parse it (also on client side). If not error, proceed.
    2. Return from cache it it exist already.
        - crypto.createHash('sha256').update(fullPathOfUrl).digest('hex')
        - search for the file in gcs bucket and if exist return.
    3. (Optional) Make a HEAD request only on client side and get the file size (content-length) and mime type headers. If file size > 10 MB or mime type is not jpeg/png then
    throw error, else proceed.
        - If url doesn't support HEAD, proceed.
        - If content-length is < 100 bytes, then throw error.
        - If status is other than 200, then throw error.
        - This also check freshness of url.

    4. If not found, then download the file in memory upto maxFileSize (12MB + 100 bytes) and if we recieved more
    bytes than that, then throw file max error, else check mime type via magic numbers by node.js.
    If not error proceed.
    5. Now begin compression, save the file in bucket with filename as a cryptic form and return the response
      with download url. Format of response is similar to `/image` route.

  SOME POINTS:
      - Images <= 10KB will not be compressed.
      - Only http(s) protocol supported. No ftp, ws, etc.
      - Don't strip query and hash string from the url required for some websites like unsplash.com
      - Basic auth url not supported. for eg: https://abc:efg@example.com.
      - Random ports also supported via WhatWG URL.origin property.
**/
/*
URL Examples: abc.com/p/34343sew.jpg, abc.com/p/3242sde, abc.com:8080/p/a/3234se, http://abc.com/p/sfwe3,
https://abc.com/p/w23s.png, abc.com/a/s3sd?q=search&q=32#hash.
*/
// FIXME: For now, use the same bucket.
// TODO: Handle rate limit when user send multiple urls from the same domain.
const storage   = new Storage();
const gcsBucket = storage.bucket(GC_STORAGE);

async function urlCtrl(req, res, next) {
    let url;
    try {
        url = new URL(req.body.url);
    }
    catch(e) {
        // TODO: Better error message for url parse.
        logdev.error('Either URL is invalid or null');
        return errors.badRequest(res, {message: 'Either URL is invalid or null'})

    }
    if(!/(http:)|(https:)/.test(url.protocol))  {
        return errors.badRequest(res, {message: 'Only http or https protocol supported'})
    }


    const filename = crypto.createHash('sha256').update(url.href).digest('hex');
    const exists = await gcsBucket.file(filename).exists();
    const gcsFile = gcsBucket.file(filename);
    const defaultResponse = {
        id: filename,
        url: utils.getDownloadUrl(filename),
        message: 'File uploaded Successfully',
        success: true
    };

    if(exists[0]) {
        const metadata = await gcsFile.getMetadata();
        // if found on gcs, then return cache
        const meta = metadata && metadata[0];
        const obj = Object.assign({}, defaultResponse, {
            type: meta.contentType,
            compressedBytes: meta.size,
            bytes: meta.metadata && meta.metadata.bytes
        });
        log.info({req: req, res: res, metadata: obj}, "URL Compression. File Already Exists. Sending same file");
        return res.send(obj);
    }

    else {
        // If recieved mime-type wrong, then return .
        // If content-length > 12 MB, return.
        // Do a get request and read the data into memory until 12MB and again check mime-type via magic numbers.
        let bufferChunks = [];
        let isResponseSent = false;
        let isMaxFileSizeExceed = false;
        const image = {size: 0, stream: null};
        request
            .get(url.href)
            .on('response', (resp) => {

                if(resp.statusCode === 404) {
                    isResponseSent = true;
                    resp.destroy();
                    return errors.notFound(res);
                }
                else if(resp.statusCode !== 200) {
                    isResponseSent = true;
                    resp.destroy();
                    return errors.badRequest(res);
                }
                resp.once('data', (chunk) => {
                    const type = fileType(chunk);
                    if(type) {
                        image.detectedMimeType = type.mime;
                        image.detectedFileExtension = '.' + type.ext;
                    }
                    if(!utils.isFileTypeValid(image)) {
                        isResponseSent = true;
                        resp.destroy();
                        return errors.unsupportedMediaType(res);
                    }

                });
                resp.on('data', (chunk) => {
                    if(image.size > MAX_FILE_SIZE + 1024*10) {    // maxFileSize + 10KB padding.
                        isMaxFileSizeExceed = true;
                        resp.destroy(); // https://stackoverflow.com/questions/11761542
                    }
                    image.size += chunk.length;  // efficient than `writeBuffer.length`.
                    bufferChunks.push(chunk);

                })
            })
            .on('end', () => {
                if(isResponseSent) return;
                if(isMaxFileSizeExceed)
                    return errors.entityTooLarge(res);
                if(image.size < 10*1024) // less than 10KB
                    return errors.unprocessableEntity(res, {message: 'File size too small'});

                const buffer = Buffer.concat(bufferChunks);
                // now compress the buffer.
                image.stream = utils.createReadStream(buffer);


                const gcsFile = gcsBucket.file(filename);
                const gcsStream = gcsFile.createWriteStream({
                    metadata: {
                        contentType: image.detectedMimeType,
                        contentDisposition: 'attachment',
                        metadata: {bytes: image.size}
                    },
                    resumable: false        // disable resumable for file size < 10MB.
                })

                // compress the image. Currently support only png/jpeg files.
                compressImage(image, {}, res, gcsStream);


                // finally send the response if compression successful.
                // Make sure request timeout limit longer in nginx to not abrupt connection.

                gcsStream
                    .on('error', (err) => {
                        log.error(err, 'Error uploading file');
                        return errors.internalServer(res);
                    })
                    .on('finish', async () => {
                        const metadata = await gcsFile.getMetadata();
                        await gcsFile.makePublic();
                        const obj = Object.assign({}, defaultResponse, {
                            type: image.detectedMimeType,
                            compressedBytes: metadata && metadata[0] && metadata[0].size,   // api response.
                            bytes: image.size
                        });
                        log.info({req: req, res: res, metadata: obj}, "URL Compression. File Uploaded Successfully");
                        res.send(obj);

                    })

            })
    }

}


module.exports = urlCtrl;
