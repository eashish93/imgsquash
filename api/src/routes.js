const
    router              = require('express').Router(),
    ctrls               = require('./ctrls'),
    errors              = require('./common/errors'),
    {log}               = require('./common/logging');


// File Upload Compression
router.post('/image', ctrls.upload, ctrls.imageCtrl);
// Url Upload Compression
router.post('/url', ctrls.url);
// Compressed file download
router.get('/dl/:id', ctrls.download);
// Compressed files (in zip) download
router.post('/zip', ctrls.zip);



// catch-all error for routes.
router.use((err, req, res, next) => {
    if(err && err.code === 'LIMIT_FILE_SIZE') {
        log.warn(err, 'Attempt to access api with greater file size');
        return errors.entityTooLarge(res);
    }
    else {
        log.warn({req: req, res: res, err: err}, 'Catch all router error');
        return next();
    }

});




module.exports = router;
