import React from 'react';
import { connect } from 'react-redux';
import Layout from  '../components/layout';
import Dropzone from '../components/dropzone';
import CompressedResult from '../components/compressedResult';


const HowToCompress = () => (
    <div className="howto mb-4 d-flex">
        <div className="mr-4 d-none d-sm-block">
            <svg width="65" height="65" xmlns="http://www.w3.org/2000/svg">
                <g fill="#56B93C">
                    <path d="M7.2355 31.7778c.7904 0 1.4312.6411 1.4312 1.4444 0 .7978-.6514 1.4445-1.4312 1.4445H1.4311C.6407 34.6667 0 34.0255 0 33.2222c0-.7977.6514-1.4444 1.4311-1.4444h5.8044zm56.3334 0c.7904 0 1.4311.6411 1.4311 1.4444 0 .7978-.6514 1.4445-1.4311 1.4445h-5.8044c-.7904 0-1.4312-.6412-1.4312-1.4445 0-.7977.6514-1.4444 1.4312-1.4444h5.8044zM34.6667 7.2355c0 .7904-.6412 1.4312-1.4445 1.4312-.7977 0-1.4444-.6514-1.4444-1.4312V1.4311C31.7778.6407 32.4189 0 33.2222 0c.7978 0 1.4445.6514 1.4445 1.4311v5.8044zm-19.995 6.8378c.5588.5589.5585 1.4653-.0095 2.0333-.564.5641-1.482.5608-2.0333.0095l-4.1044-4.1044c-.5589-.5589-.5586-1.4653.0094-2.0333.5641-.5641 1.482-.5608 2.0334-.0094l4.1043 4.1043zm39.1439 2.0428c-.559.5589-1.4653.5586-2.0334-.0095-.564-.564-.5607-1.482-.0094-2.0333l4.1044-4.1043c.5589-.559 1.4653-.5586 2.0333.0094.564.564.5608 1.482.0094 2.0333l-4.1043 4.1044zM37.5556 46.8037c5.8907-2.0821 10.111-7.7 10.111-14.3037 0-8.3763-6.7903-15.1667-15.1666-15.1667S17.3333 24.1237 17.3333 32.5c0 6.6037 4.2204 12.2216 10.1111 14.3037V62.111h10.1112V46.8037zM14.4444 33.2222c0-10.694 8.0838-18.7778 18.7778-18.7778 9.2496 0 17.3334 8.0838 17.3334 18.7778 0 6.3403-4.093 12.6426-10.1112 15.889v13c0 1.5798-1.3926 2.8888-2.851 2.8888h-10.149c-1.3132 0-2.8888-1.3974-2.8888-2.8889v-13c-6.0183-3.2463-10.1112-9.5486-10.1112-15.8889zm13 17.3334h10.1112v2.8888H27.4444v-2.8888zm0 5.7777h10.1112v2.889H27.4444v-2.889z" />
                </g>
            </svg>
        </div>
        <section>
            <h2 className="h5 font-weight-bold text-uppercase">How to Compress ?</h2>
            <p>
                Simply click or drop your png/jpeg files in above box and start compression. You can optionally select for files to compress with <strong>lossless</strong> mode instead of <strong>lossy&nbsp;</strong>
                which will compress your files without modifying any pixel and will only remove comments, extra metadata. For websites, we recommended you to use the default (<strong>lossy</strong>) mode which
                will compress your images upto 70%.
            </p>
        </section>
    </div>
)

const Features = () => (
    <div className="group row mb-5">
        <div className="col-md-6 col-12">
            <div className="d-flex flex-row">
                <div style={{ 'float': 'left', marginRight: '1.6em' }}>
                    <svg width="61px" height="69px" viewBox="0 0 61 69" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <rect id="mpath1" x="10" y="18" width="45" height="45" rx="4.08"></rect>
                            <rect id="mpath2" x="10" y="10" width="45" height="45" rx="4.08"></rect>
                        </defs>
                        <g fill="none" fillRule="evenodd">
                            <g transform="translate(-2.000000, -2.000000)">
                                <g transform="translate(32.500000, 40.500000) rotate(45.000000) translate(-32.500000, -40.500000) ">
                                    <use fill="#FFFFFF" fillRule="evenodd" href="#mpath1"></use>
                                    <rect stroke="#2A51C6" strokeWidth="2" x="11" y="19" width="43" height="43" rx="4.08"></rect>
                                </g>
                                <g transform="translate(32.500000, 32.500000) rotate(45.000000) translate(-32.500000, -32.500000) ">
                                    <use fill="#FFFFFF" fillRule="evenodd" href="#mpath2"></use>
                                    <rect stroke="#2A51C6" strokeWidth="2" x="11" y="11" width="43" height="43" rx="4.08"></rect>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <section>
                    <h2 className="h6 font-weight-bold">Multi Upload & Batch Processing</h2>
                    <p>You can upload upto 15 files at once with max 3 files to be processed
                        in parallel unlike other online compressor which only compress one file at a time.
                    </p>
                </section>
            </div>
        </div>

        <div className="col-md-6 col-12">
            <div className="d-flex flex-row">
                <div style={{ 'float': 'left', marginRight: '1.6em' }}>
                    <svg width="68" height="62" xmlns="http://www.w3.org/2000/svg">
                        <g transform="translate(1 1)" fill="none">
                            <circle strokeWidth="2" stroke="#EC261B" cx="30" cy="30" r="30" />
                            <path strokeWidth="2" d="M0 30h60M30 0c7.5038411 8.2150587 11.7682583 18.8761016 12 30-.2317417 11.1238984-4.4961589 21.7849413-12 30-7.5038411-8.2150587-11.7682583-18.8761016-12-30 .2317417-11.1238984 4.4961589-21.7849413 12-30z" stroke="#EC261B" />
                            <path d="M52.4761902 41C49.2134585 41 47 43.6756743 47 47.0810783 47 52.9189267 51.2857146 55.351351 57 59c5.7142854-3.648649 10-6.0810733 10-11.9189217C67 43.6756743 64.7865415 41 61.5238098 41 59.4237683 41 57.6976732 42.2162122 57 42.945942 56.3023268 42.2162122 54.5762317 41 52.4761902 41z" fill="#EC261B" />
                        </g>
                    </svg>
                </div>
                <section>
                    <h2 className="h6 font-weight-bold">SEO Friendly Images</h2>
                    <p>Compressing images for web not only boost performance
                        and initial loading time, but it also gives you huge
                        benefit in terms of SEO.
                    </p>
                </section>
            </div>
        </div>
    </div>
)




function Index(props) {
    
    return (
        <Layout
            title="ImgSquash - Compress Images to smallest size"
            metaDescription="Free online image compressor for jpeg and png images with bulk compression and parallel uploading. Upto 70% reduction in original while maintaining quality.">
            <Dropzone />
            {/* <CompressedResult /> */}
            {/* {props.stage === 0 ? <Dropzone /> : <CompressedResult />} */}
            <HowToCompress />
            <Features />
        </Layout>
    )
}




export default connect(
    (state) => ({ stage: state.stage })   
)(Index);