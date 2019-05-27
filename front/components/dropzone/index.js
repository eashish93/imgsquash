import React, {Fragment} from 'react';
import styles from './styles';
import {useDropzone} from 'react-dropzone';
import prettyBytes from 'pretty-bytes';
import { storeImages, clearDropzone, beginCompression, changeCompressionMode } from '../../actions';
import { connect } from 'react-redux';

/**
NOTES
    - multiple files can be selected at most 15.
    - If 10 files already dropped and user trying the drop the new files, then give error.
    - User can remove any files from the dropzone before uploading.
    - Compression Button should be disabled before any file dropped.
    - Give error if user select any file greater than 12 MB and exclude from list.
    - If user select the same file twice, exclude it.
**/

const maxFileSize = 10; // 10 MB 

function DropzoneComponent({images, compression, ...props}) {
    const [error, setError] = React.useState(null);
    const {getRootProps, getInputProps} = useDropzone({
        accept: ['image/jpeg', 'image/png'],
        onDrop: (acceptedFiles, rejectedFiles) => {
            // As we are manually generating the preview of selected images, so we don't need to free memory of rejected files.
            const maxLength = 15;
            const maxErrorTime = 3200; // 3.2 sec.
            //  max file size handled already.
            console.log('Accepted Files', acceptedFiles);
            console.log('Rejected Files', rejectedFiles);

            // handle errors.
            // handle blank drag and drop also.
            // TODO: Handle error of rejected mime type on drag and drop.
            if (rejectedFiles.length > 0 && rejectedFiles[0].name) {
                setError(`Max file size limit is ${maxFileSize}MB`)
                setTimeout(() => {
                    setError(null);
                }, maxErrorTime);

            }


            if (images.length + acceptedFiles.length > maxLength) {
                setError(`Max files dropped must not be greater than ${maxLength}`)
                setTimeout(() => {
                    setError(null);
                }, maxErrorTime);
            }

            // now set the state
            props.storeImages(acceptedFiles, maxLength);

            // console.log('Images', images);
            // console.log('New Files', newFiles);
        },
        multiple: true,
        maxSize: maxFileSize * 1024 * 1024
    })



    return (
        <div className="dropzone-wrap" {...getRootProps()}>
            <div className="dropzone mb-3">
                {(images.length > 0) ?
                    <Fragment>
                        <div className="clear-dropzone" onClick={props.clearDropzone}>✕</div>
                        <ul className="list-unstyled d-flex flex-row flex-wrap align-items-center">
                            {images.map(it => <li key={it.name} className="card image-preview">
                                <img src={it.preview} alt="preview" height="120" />
                                <div className="size text-center">{prettyBytes(it.size)}</div>
                            </li>)}
                        </ul>
                    </Fragment>
                    :
                    <Fragment>
                        <input name="image" {...getInputProps()}/>
                        <img src="/static/images/dropIcon.svg" width="250" alt="dropIcon" className="dropIcon" />
                        <p className="lead meta-01 mb-0 font-weight-bold" style={{ letterSpacing: '1px' }}>Click to Upload</p>
                        <p className="meta-02 mb-0" style={{ letterSpacing: '1px' }}>or drop your files</p>
                        <p className="small" style={{ position: 'absolute', 'left': '2em', bottom: '.2em' }}>Max file size limit:&nbsp;<strong>{maxFileSize} MB</strong></p>
                    </Fragment>
                }
                <div className={error ? 'error-box show' : 'error-box'}>
                    {error}
                </div>
            </div>
            

            <div className="box-foot mb-5 d-flex flex-row flex-wrap justify-content-between">
                <div className="modes">
                    <button className={`lossless btn ${compression === 'lossless' ? 'active' : ''}`} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props.changeCompressionMode('lossless');
                    }}>
                        Lossless
                        </button>
                    <button className={`lossy btn ${compression === 'lossy' ? 'active' : ''}`} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props.changeCompressionMode('lossy');
                    }}>
                        Lossy
                        </button>
                </div>
                <button className="compress-btn btn"
                    disabled={images.length > 0 ? false : true}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.beginCompression();
                    }}
                >
                    {images.length > 0 ? 'Begin Compression' : 'Select First'}
                </button>
            </div>
        <style jsx>{styles}</style>
        </div>
            
    )
}


const mapState = (state) => ({
    images: state.images, 
    compression: state.compression
});

const mapProps = {
    clearDropzone,
    beginCompression,
    changeCompressionMode,
    storeImages
}


export default connect(mapState, mapProps)(DropzoneComponent);