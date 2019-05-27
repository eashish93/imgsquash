const {imageCtrl, upload} = require('./image');

module.exports = {
    imageCtrl, 
    upload,
    url: require('./url'),
    download: require('./download'),
    zip: require('./zip')
}
