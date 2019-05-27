import types from './constants';
import request from 'superagent';
import asyncEachLimit from 'async/eachLimit';
import constants from '../shared/constants';

export const setStage = (id) => ({
    type: types.SET_STAGE,
    id
});

export const storeImages = (acceptedFiles, maxLength) => ({
    type: types.DROP_IMAGES,
    acceptedFiles,
    maxLength
})


export const clearDropzone = () => ({
    type: types.CLEAR_DROPZONE
});

export const startAgain = () => ({
    type: types.START_AGAIN
})

export const changeCompressionMode = (mode) => ({
    type: types.CHANGE_COMPRESSION_MODE,
    mode
});




// private functions.
const updateProgress = (id, value) => ({
    type: types.UPDATE_PROGRESS,
    id, value
})

const updateFileStatus = (id, status) => ({
    type: types.UPDATE_FILE_STATUS,
    id, status
})

const updateCompressedImage = (id, res, status) => ({
    type: types.UPDATE_COMPRESSED_IMAGE,
    id, res, status
});

const updateFinalResult = (bytes, compressedBytes) => ({
    type: types.UPDATE_FINAL_RESULT,
    bytes, compressedBytes
});

const readyZip = (zipReady) => ({
    type: types.ZIP_READY,
    zipReady
});


export const beginCompression = () => (dispatch, getState) => {
    dispatch(setStage(1));  // switch to compression page.

    const images = getState().images;
    const mode = getState().compression;
    const status = ['uploading', 'compressing', 'done', 'error'];
    const limit = 3;    // number of files to process at a time. Also apply rate limiting.

    if(images && images.length) {
        asyncEachLimit(images, limit, (image, cb) => {
            const data = new FormData();
            const isLossy = (mode === 'lossy') ? true : false
            data.append('file', image);
            data.append('lossy', isLossy); //default lossy.
            dispatch(updateFileStatus(image.name, status[0]));
            return request
               .post(`${constants.API_HOST}/image`)
               .send(data)
               .on('progress', (e) => {
                   if(e.direction === 'upload') {
                       console.log('Uploading: ', e.percent);
                       // TODO: Debounce this.
                       dispatch(updateProgress(image.name, e.percent));
                       if(e.percent === 100) {
                           dispatch(updateFileStatus(image.name, status[1]));
                       }
                   }
               })
               .then(resp => {
                   const result = resp.body;
                   if(result) {
                       dispatch(updateCompressedImage(image.name, result, status[2]));
                       dispatch(updateFinalResult(result.bytes, result.compressedBytes));
                   }
                   cb();
               }, err => {
                   dispatch(updateFileStatus(image.name, status[3]));
                   cb();
               })

        }, (err) => {
            // final callback
            dispatch(readyZip(true));
        })
    }

}


// FOR IMAGE URLS
// --------------
const storeURL = (name, href) => ({
    type: types.STORE_URL,
    name, href
});

const setURLError = (name, status, message) => ({
    type: types.SET_URL_ERROR,
    name, status,  message
});

const updateCompressedURL = (name, res, status) => ({
    type: types.UPDATE_COMPRESSED_URL,
    name,
    res,
    status
})


export const compressURL = (url) => (dispatch, getState) => {
    const imageUrls = getState().imageUrls;
    const status = ['compressing', 'done', 'error'];

    dispatch(storeURL(url.name, url.href)); // store initial url data.
    return request
        .post(`${constants.API_HOST}/url`)
        .send({url: url.href})

        .then(resp => {
            const result = resp.body;
            dispatch(updateCompressedURL(url.name, result, status[1]))

        }, err => {
            if(err && err.response && err.response.body) {
                dispatch(setURLError(url.name, status[2], err.response.body.message));
            }
            else {
                dispatch(setURLError(url.name, status[2], err.message));
            }

        })
}









// ### END ###
