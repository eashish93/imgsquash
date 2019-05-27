import React, {Fragment} from 'react';
import Layout from '../components/layout';
import compressedResultStyles from '../components/compressedResult/styles';
import css from 'styled-jsx/css';
import colors from '../shared/colors';
import {connect} from 'react-redux';
import { compressURL } from '../actions';
import Url from 'url-parse';

const UrlPaster = ({imageUrls, ...props}) => {
    const [error, setError] = React.useState(null);

    const onSubmit = (e) => {
        e.preventDefault();
        /**
            URL Parse Condition
                - Check for http: or https:
                - Check for hostname or ip address
                - Check for null or falsy or empty value.
        **/

        let url = e.target.url.value;
        const validIpAddress = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
        const validHostname = /^(?=.{0,253}$)(([a-z0-9][a-z0-9-]{0,61}[a-z0-9]|[a-z0-9])\.)+((?=.*[^0-9])([a-z0-9][a-z0-9-]{0,61}[a-z0-9]|[a-z0-9]))$/i;

        try {
            url = new Url(url);
            if (/(http:)|(https:)/.test(url.protocol) && (validIpAddress.test(url.hostname) || validHostname.test(url.hostname))) {
                console.log('Successfully Parsed:', url, url.href);
                url.name = url.pathname && url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
                props.compressURL(url);
            }
            else {
                setError('Error! Url must be valid and must be start with http(s)');
            }
        } catch (e) {
            setError('Error! Url must be valid and must be start with http(s)');
        }
    }



    return (
        <Layout
            title="Imgsquash - URL Paster (Compression)"
            metaDescription="Imgsquash free url paster service of jpeg and png file compression. Just paste any valid image url."
            path="/url-paster"
        >
            <main id="main">
                <header className="text-center mt-2 mb-5">
                    <h1 className="h4">Direct Image URL Compression</h1>
                    <h6>Only jpeg and png files supported</h6>
                </header>
                <div className="url-box mb-5">
                    {error && <div className="alert alert-danger">
                        {error}
                        <button className="close" onClick={() => setError(null)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <p className="font-weight-bold">Enter an image url:</p>
                        <p className="xsmall">Max file size is <strong>10 MB</strong>.</p>
                    </div>
                    <form onSubmit={onSubmit}>
                        <input type="text" name="url" className="form-control form-control-lg mb-3" placeholder="https://imageurl.com/filename.jpg" />
                        <div className="text-right">
                            <button className="btn btn-compress" type="submit">Begin Compression</button>
                        </div>
                    </form>
                </div>
                <ul className="list-unstyled url-results compressed-result mb-5">
                    {imageUrls.length > 0 ? imageUrls.map(it => <li key={it.name}>
                        <div className="file">
                            <div className="progress-wrap">
                                <p className="font-weight-bold mb-2 name">{it.name}</p>
                                <div className="progress">
                                    <div className={`progress-bar ${it.status === 'compressing' ?
                                        'compressing' : it.status === 'done' ? 'done' :
                                            it.status === 'error' ? 'error' : ''}`}
                                        style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            {it.error ? <div className="error alert alert-danger" style={{ transform: 'translate(0, 12px)', minWidth: '300px', textAlign: 'center' }}>
                                {it.error}
                            </div> : <Fragment>
                                    <div className="status d-none d-sm-block">
                                        <div className="font-weight-bold">Status</div>
                                        <div>{it.status}</div>
                                    </div>
                                    <div className="size d-none d-sm-block">
                                        <div className="font-weight-bold">Original</div>
                                        <div>{it.size ? prettyBytes(Number(it.size)) : '--'}</div>
                                    </div>
                                    <div className="size d-none d-sm-block">
                                        <div className="font-weight-bold">Squashed</div>
                                        <div className="text-center">{it.squashed ? prettyBytes(Number(it.squashed)) : '--'}</div>
                                    </div>
                                    <div>
                                        <a className="btn btn-sm download-single-btn"
                                            disabled={(it.status === 'done') ? false : true} href={it.download_url + `?name=${it.name}`}>Download</a>
                                    </div>
                                </Fragment>}
                        </div>
                    </li>) : <p className="text-muted text-center mb-0">No results to display</p>}
                </ul>
            </main>
            <style jsx>{compressedResultStyles}</style>
            <style jsx>{styles}</style>
        </Layout>
    )
}


const styles = css`
    .url-box input {
        border-radius: 2px;
        border-color: ${colors['grey500']};
        font-size: 14px;
        padding: .8rem 1.4rem;
    }
    .url-box  input:focus {
        border-color: ${colors['grey900']};
        box-shadow: 0 1px 4px rgba(0,0,0,.1);
    }
    .url-box .btn-compress {
        border: 1px solid #212121;
        min-width: 250px;
        height: 100%;
        min-height: 55px;
        background: #000;
        color: #fff;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.1);
    }
    @media(max-width: 480px) {
        .url-box .btn-compress {
            width: 100%;
        }
    }

    .url-results {
        min-height: 100px;
    }
`
    

export default connect(
    (state) => ({ imageUrls: state.imageUrls }),
    {compressURL}
)(UrlPaster);
