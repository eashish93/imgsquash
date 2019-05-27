const
    bunyan          = require('bunyan'),
    bunyanFormat    = require('bunyan-format'),
    GcsLogging      = require('@google-cloud/logging-bunyan');



// configure logging
const log = bunyan.createLogger({
    name: 'imgsquash-api',
    streams: [
        {level: 'info', stream: bunyanFormat({outputMode: 'short'})},
    ],
    serializers: bunyan.stdSerializers
});

const logdev = bunyan.createLogger({
    name: 'logdev',
    stream: bunyanFormat({outputMode: 'short'})
});



if(process.env.NODE_ENV === 'production') {
    // with `info` level,  `error`, 'warn' and `fatal` will also pass through this stream.
    const obj = (new GcsLogging()).stream('info');  // { level: level, type: 'raw', stream: this}
    log.addStream(obj);
}



module.exports = {
    log: log,
    logdev: logdev
}
