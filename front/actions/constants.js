// async constants suffix
// private common constants
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createTypes(base) {
    const requestType = {};
    [REQUEST, SUCCESS, FAILURE].forEach(type => {
        requestType[type] = `${base}_${type}`;
    });
    return requestType;
}



module.exports = {
    SET_STAGE: 'SET_STAGE', // 0 -> initial, 1 -> result (compressed page)
    DROP_IMAGES: 'DROP_IMAGES',
    CLEAR_DROPZONE: 'CLEAR_DROPZONE',
    UPDATE_PROGRESS: 'UPDATE_PROGRESS',
    UPDATE_FILE_STATUS: 'UPDATE_FILE_STATUS',
    UPDATE_COMPRESSED_IMAGE: 'UPDATE_COMPRESSED_IMAGE',
    UPDATE_FINAL_RESULT: 'UPDATE_FINAL_RESULT',     // reusable by both files and urls.
    START_AGAIN: 'START_AGAIN',
    CHANGE_COMPRESSION_MODE: 'CHANGE_COMPRESSION_MODE',
    ZIP_READY: 'ZIP_READY',

    // For URL
    STORE_URL: 'STORE_URL',
    SET_URL_ERROR: 'SET_URL_ERROR',
    UPDATE_COMPRESSED_URL: 'UPDATE_COMPRESS_URL'
}
