const
    request         = require('request'),
    archiver        = require('archiver'),
    errors          = require('../common/errors'),
    {log}   = require('../common/logging'),
    {GC_STORAGE}    = require('../common/constants');


function zipCtrl(req, res, next) {
    const files = req.body && req.body.files && JSON.parse(req.body.files);

    // don't throw error in this route. Just log them.
    if(files && files.length) {
        const baseUrl = `https://storage.googleapis.com/${process.env.GC_STORAGE}`;
        const archive = archiver('zip');
        archive.on('warning', (err) => {
            if(err.code === 'ENOENT') {
                log.err(err, 'Archive Warning [ENOENT]');
            }
            else {
                log.error(err, 'Archive Warning');
            }
        });

        // const totalSize =  files.map(it=>it.size).reduce((a,b) => Number(a) + Number(b));


        archive.on('finish', (err) => {
            if(err) {
                log.error(err, 'Archive Error');
                throw err;
            }
        })

        archive.on('error', (err) => {
            log.error(err, 'Archive Error');
        });

        // set headers.
        // don't set both Transfer-Encoding and `Content-Length`.
        res.set({
            "Content-Type": "application/zip",
            'Content-Disposition': 'attachment; filename="compressed.zip"',
            // 'Content-Length': totalSize  // this doesn't work on server with or without nginx.
        });

        archive.pipe(res); // pipe to response.

        // append all files.
        files.forEach(it => {
            // name must be unique. otherwise it will not process.
            // also setting compression -> store.
            // const reader = gcsBucket.file(it.id).createReadStream();
            // reader.on('error', (err) => {
            //     // don't throw error. Just log them.
            // });
            // request is safer than commented code as it will skip deleted files.
            archive.append(request(baseUrl + `/${it.id}`), {name: it.name, store: true});
        })

        archive.finalize(); // finalize the archive. But streams doesn't finished yet.
    }

    else {
        errors.notFound(res);
    }
}


module.exports = zipCtrl;
