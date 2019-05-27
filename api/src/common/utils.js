const
    {DL_BASE_URL} = require('./constants'),
    Readable = require('stream').Readable;


const utils = {
    getDownloadUrl(filename) {
        return `${DL_BASE_URL}/${filename}`;  // on production, map DL_BASE_URL to gcs server.
    },
    toType(x) {
        return ({}).toString.call(x).slice(8, -1).toLowerCase();
    },
    createReadStream(buff) {
        // handy stream function to create stream from buffer.
        const readable = new Readable();
        readable.push(buff);
        readable.push(null);    // end-of-stream
        return readable;
    },
    isFileTypeValid(file) {
        // internally multer new api uses `stream-file-type` package which is good for image types.
        const mimeTypes = ['image/jpeg', 'image/png'];
        const extns = ['.jpg', '.jpeg', '.png'];
        const mime = file.detectedMimeType;
        const ext = file.detectedFileExtension;

        if((mimeTypes.findIndex(i => i === mime) >= 0) && (extns.findIndex(i => i === ext) >= 0) ) {
            return true;
        }
        else return false;
    }
}

module.exports = utils;
