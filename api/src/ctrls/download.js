const
    {GC_STORAGE} = require('../common/constants'),
    request     = require('request'),
    fileType    = require('file-type'),
    errors      = require('../common/errors'),
    {log, logdev} = require('../common/logging')

// get the right file name with correct extension.
function parseName(ext, name) {
    if(typeof(name) === 'string' && ext.length > 0) {
        // const ext = id.slice(id.lastIndexOf('.'));
        const filename = name.split('.')[0];
        return filename + '.' + ext;
    }
    else return '';
}



function downloadCtrl(req, res, next) {
    const id = req.params.id;
    const name = req.query && req.query.name;
    const gcsUrl = `https://storage.googleapis.com/${GC_STORAGE}/`;

    request
        .get(gcsUrl + id)
        .on('response', (resp) => {
            // delete resp.headers['x-goog-expiration'];
            // delete resp.headers['x-goog-generation'];
            // delete resp.headers['x-goog-hash'];
            // delete resp.headers['x-goog-storage-class'];
            // delete resp.headers['x-goog-metageneration'];
            // delete resp.headers['x-goog-stored-content-encoding'];
            // delete resp.headers['x-goog-stored-content-length'];
            // delete resp.headers['x-guploader-uploadid'];
            // delete resp.headers['server'];
            // delete resp.headers['alt-svc'];
            // delete resp.headers['accept-ranges'];
            if(resp.statusCode === 500) {
                return errors.internalServer(res);
            }
            else if(resp.statusCode !== 200) {
                return errors.notFound(res);
            }
            else {
                let ext = '';
                resp.once('data', (chunk) => {
                    ext = fileType(chunk).ext;
                })
                res.set({
                    'cache-control': resp.headers['cache-control'],
                    'content-type': resp.headers['content-type'],
                    'content-length': resp.headers['content-length'],
                    'content-disposition': `attachment; filename=${parseName(ext, name)}`,
                    'etag': resp.headers['etag']
                });
                resp.pipe(res);
            }
        })
        .on('error', (err) => {
            log.warn(err, 'Error into getting url. Route: /dl/:id');
            return errors.internalServer(res);
        })
}



module.exports = downloadCtrl;
