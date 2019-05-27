import {combineReducers} from 'redux';
import t from '../actions/constants';


// for images drop.
const images = (state = [], action) => {
    const images = state.slice();
    switch(action.type) {
        case t.DROP_IMAGES:
            let requiredLength = action.maxLength - images.length;
            const newFiles = [];
            for(const it of action.acceptedFiles) {
                if(!requiredLength) break;
                const sameName = images.find(el => el.name === it.name);
                if( (typeof(sameName) === 'undefined') && requiredLength) {
                    newFiles.push(it);
                    requiredLength--;
                }
            }
            // generate previews of these new files
            newFiles.forEach(file => {
                file.preview = window.URL.createObjectURL(file);
            });
            return images.concat(newFiles);     // as we already sliced state above.

        case t.CLEAR_DROPZONE:
        case t.START_AGAIN:
            for(const it of images) { // free memory.
                window.URL.revokeObjectURL(it.preview);
            }
            return [];
        case t.UPDATE_PROGRESS:
            for(const it of images) {
                if(it.name === action.id) {
                    it.progress = action.value;
                    return images;
                }
            }
            return state;

        case t.UPDATE_FILE_STATUS:
            for(const it of images) {
                if(it.name === action.id) {
                    it.status = action.status;
                    return images;
                }
            }
            return state;

        case t.UPDATE_COMPRESSED_IMAGE:
            for(const it of images) {
                if(it.name === action.id) {
                    it.status = action.status;
                    it.download_url = action.res.url;
                    it.squashed = action.res.compressedBytes;
                    it.id = action.res.id;     // stored for zip download.
                    return images;
                }
            }


        default: return state;
    }

}

const stage = (state = 0, action) => {  // default stage is 0 -> initial.
    switch(action.type) {
        case t.SET_STAGE: return {
            ...state,
            stage: action.id
        }
        case t.START_AGAIN: return 0;
        default: return state;
    }
}

const result = (state = {totalSavedBytes: 0}, action) => {
    switch(action.type) {
        case t.UPDATE_FINAL_RESULT:
            return {
                totalSavedBytes: state.totalSavedBytes + Number(action.bytes) - Number(action.compressedBytes)
            }
        case t.START_AGAIN: return {totalSavedBytes: 0}
        default: return state;
    }
}

const compression = (state = 'lossy', action) => {
    switch(action.type) {
        case t.CHANGE_COMPRESSION_MODE:
            return action.mode;
        default: return state;
    }
}

const zipReady = (state = false, action) => {
    switch(action.type) {
        case t.ZIP_READY: return action.zipReady;
        case t.START_AGAIN: return false;
        default: return state;
    }
}

/**
error: `Please enter a url`
    - `Url must be valid and start with http(s) only.`
{
    href : '',
    name: '',
    status: '',
    download_url: '',
    squashed: '',
    size: '',
    error: null
}

**/

// image url compressions.
const imageUrls = (state = [], action) => {
    const images = state.slice();
    switch(action.type) {
        case t.STORE_URL:
            for(const it of images) {
                if(it.name === action.name)     // image already compressed and exist in store.
                    return images;
            }
            return images.concat({name: action.name, href: action.href, status: 'compressing'});

        case t.UPDATE_COMPRESSED_URL:
            for(const it of images) {
                if(it.name === action.name) {
                    it.size = action.res.bytes;
                    it.status = action.status;
                    it.download_url = action.res.url;
                    it.squashed = action.res.compressedBytes;
                    it.id = action.res.id;     // stored for zip download.
                    return images;
                }
            }
            return state;

        case t.SET_URL_ERROR:
            for(const it of images) {
                if(it.name === action.name) {
                    it.status = action.status;
                    it.error = action.message;
                    return images;
                }
            }
            return state;

        default: return state;
    }
}


export default combineReducers({
    images,
    stage,
    result,
    compression,
    zipReady,
    imageUrls
})
