import React, { Fragment } from 'react';
import styles from './styles';
import SocialShare from '../socialShare';
import prettyBytes from 'pretty-bytes';
import { connect } from 'react-redux';
import { startAgain } from '../../actions';

/***
Some points
    - Four status: uploading, compressing, done, error
    - Add extra info to images : `status`, `squashed`, `download_url`, progress.
**/


const DownloadAll = ({ zipReady, images }) => {
    const Button = ({ disabled }) => (
        <button className="btn download-all mb-2" disabled={disabled}>
            Download All
        </button>
    )
    if (zipReady) {
        let imagesInfo = [];
        images.forEach(it => {
            if (it.status === 'done') {
                imagesInfo.push({ id: it.id, size: it.squashed, name: it.name });
            }
        });

        if (imagesInfo.length) {
            return (
                <form action={`${process.env.API_HOST}/zip`} method="post">
                    <input type="hidden" value={JSON.stringify(imagesInfo)} name="files" />
                    <Button disabled={!zipReady} />
                </form>
            )
        }
        else return <Button disabled={true} />
    }
    else {
        return <Button disabled={!zipReady} />
    }
    // return (
    //     <form action={`${process.env.API_HOST}/zip`} method="post">
    //         <input type="hidden" value={JSON.stringify([
    //             {id: '1513167392474q92.jpg', size: 35480, name: 'q92.jpg'},
    //             {id: '1513238746187q20-4x.jpg', size: 1780000, name: 'q20-4x.jpg'},
    //             {id: '1513238856384map-compressed.png', size: 13900, name: 'map-compressed.jpg'},
    //             {id: '513239155854andreas-p-30199.jpg', size: 336850, name: 'q392.jpg'}
    //         ])} name="files"/>
    //         <button className="btn download-all mb-2" type="submit">
    //             Download All
    //         </button>
    //     </form>
    // )
}


const CompressedResult = ({ images, totalSavedBytes, dispatch, zipReady }) => (
    <Fragment>
        <ul className="list-unstyled compressed-result">
            {images.map(it => <li key={it.name}>
                <img src={it.preview} alt="preview" height="60" />
                <div className="file">
                    <div className="progress-wrap">
                        <p className="font-weight-bold mb-2 name">{it.name}</p>
                        <div className="progress">
                            <div className={`progress-bar ${it.status === 'compressing' ?
                                'compressing' : it.status === 'done' ? 'done' :
                                    it.status === 'error' ? 'error' : ''}`}
                                style={{ width: `${it.status === 'error' ? 100 : it.progress}%` }}></div>
                        </div>
                    </div>
                    <div className="status d-none d-sm-block">
                        <div className="font-weight-bold">Status</div>
                        <div>{it.status || 'waiting'}</div>
                    </div>
                    <div className="size d-none d-sm-block">
                        <div className="font-weight-bold">Original</div>
                        <div>{prettyBytes(it.size)}</div>
                    </div>
                    <div className="size d-none d-sm-block">
                        <div className="font-weight-bold">Squashed</div>
                        <div className="text-center">{it.squashed ? prettyBytes(Number(it.squashed)) : '--'}</div>
                    </div>
                    <div>
                        <a className="btn btn-sm download-single-btn"
                            disabled={(it.status === 'done') ? false : true} href={it.download_url + `?name=${it.name}`}>Download</a>
                    </div>
                </div>
            </li>)}

        </ul>

        <div className="row mb-5">
            <div className="col-12 col-md-9 mb-3">
                <div className="compressed-result__final">
                    <p className="mb-2" style={{ letterSpacing: '1px' }}>Total Bytes Saved: <strong>~{prettyBytes(totalSavedBytes)}.</strong></p>
                    <SocialShare compressedSize={prettyBytes(totalSavedBytes)} />
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className="d-flex flex-column cta-btns">
                    {/** disabled until all status have some response **/}
                    <DownloadAll images={images} zipReady={zipReady} />
                    <button className="btn start-again" onClick={() => dispatch(startAgain())}>
                        Start Again
                    </button>
                </div>
            </div>
        </div>
        <style jsx>{styles}</style>
    </Fragment>
)


export default connect(
    (state) => ({ images: state.images, totalSavedBytes: state.result.totalSavedBytes, zipReady: state.zipReady })
)(CompressedResult);
