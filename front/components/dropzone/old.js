import React, { Fragment } from 'react';
import styles from './styles';
import Dropzone from 'react-dropzone';
import prettyBytes from 'pretty-bytes';
import { setStage, storeImages, clearDropzone, beginCompression, changeCompressionMode } from '../../actions';
import { connect } from 'react-redux';

/**
To implement dropzone
    - multiple files can be selected at most 15.
    - If 10 files already dropped and user trying the drop the new files, then give error.
    - User can remove any files from the dropzone before uploading.
    - Compression Button should be disabled before any file dropped.
    - Give error if user select any file greater than 12 MB and exclude from list.
    - If user select the same file twice, exclude it.
**/

const maxFileSize = 12;

class DropzoneComponent extends React.Component {
    state = {
        error: null
    }


    onDrop = (acceptedFiles, rejectedFiles) => {
        // As we are manually generating the preview of selected images, so we don't need to free memory of
        // rejected files.
        const maxLength = 15;
        const maxErrorTime = 3200; // 3.2 sec.
        const images = this.props.images;
        //  max file size handled already.
        // console.log('Accepted Files', acceptedFiles);
        // console.log('Rejected Files', rejectedFiles);

        // handle errors.
        // handle blank drag and drop also.
        // TODO: Handle error of rejected mime type on drag and drop.
        if (rejectedFiles.length > 0 && rejectedFiles[0].name) {
            this.setState({
                error: `Max file size limit is ${maxFileSize}MB`
            });
            setTimeout(() => {
                this.setState({ error: null })
            }, maxErrorTime);

        }

        if (images.length + acceptedFiles.length > maxLength) {
            this.setState({
                error: `Max files dropped must not be greater than ${maxLength}`
            });
            setTimeout(() => {
                this.setState({ error: null })
            }, maxErrorTime);
        }


        // now set the state
        this.props.dispatch(storeImages(acceptedFiles, maxLength));

        // console.log('Images', images);
        // console.log('New Files', newFiles);

    }

    clearDropzone = (e) => {
        e.stopPropagation();
        this.props.dispatch(clearDropzone());
    }

    onUpload = (e) => {
        e.stopPropagation();
        this.props.dispatch(beginCompression());
    }

    onChangeMode = (e, mode) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.dispatch(changeCompressionMode(mode));
    }


    render() {
        const { error } = this.state;
        const { images, compression } = this.props;
        return (
            <Fragment>
                <div className="dropzone-wrap">
                    <Dropzone className="dropzone-plugin"
                        accept="image/jpeg, image/png"
                        onDrop={this.onDrop}
                        multiple
                        disablePreview
                        maxSize={maxFileSize * 1024 * 1024}
                        inputProps={{ name: 'image' }}
                    >
                        <div className="dropzone mb-3">

                            {(images.length > 0) ?
                                <Fragment>
                                    <div className="clear-dropzone" onClick={this.clearDropzone}>✕</div>
                                    <ul className="list-unstyled d-flex flex-row flex-wrap align-items-center">
                                        {images.map(it => <li key={it.name} className="card image-preview">
                                            <img src={it.preview} alt="preview" height="120" />
                                            <div className="size text-center">{prettyBytes(it.size)}</div>
                                        </li>)}
                                    </ul>
                                </Fragment>
                                :
                                <Fragment>
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

                    </Dropzone>
                    <div className="box-foot mb-5 d-flex flex-row flex-wrap justify-content-between">
                        <div className="modes">
                            <button className={`lossless btn ${compression === 'lossless' ? 'active' : ''}`} onClick={(e) => this.onChangeMode(e, 'lossless')}>
                                Lossless
                            </button>
                            <button className={`lossy btn ${compression === 'lossy' ? 'active' : ''}`} onClick={(e) => this.onChangeMode(e, 'lossy')}>
                                Lossy
                            </button>
                        </div>
                        <button className="compress-btn btn"
                            disabled={images.length > 0 ? false : true}
                            onClick={this.onUpload}
                        >
                            {images.length > 0 ? 'Begin Compression' : 'Select First'}
                        </button>
                    </div>

                </div>

                <style jsx>{styles}</style>
            </Fragment>
        )
    }
}


export default connect(
    (state) => ({ images: state.images, compression: state.compression })
)(DropzoneComponent);
