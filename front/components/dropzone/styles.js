import css from 'styled-jsx/css';
import colors from '../../shared/colors';

// page index
export default css`
    .dropzone-wrap .dropzone {
        min-height: 400px;
        padding: .8rem;
        background: #fff;
        display: flex;

        border: 1px solid ${colors['grey200']};
        box-shadow: 0 4px 12px rgba(0,0,0,.08);
        border-radius: 4px;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        flex-direction: column;
        position: relative;
    }

    .dropzone .dropIcon {
        margin-bottom: 1rem;
        padding: .2rem;
    }
    .dropzone .clear-dropzone {
        /** dropzone clear btn **/
        position: absolute;
        right: 20px;
        top: 15px;
        border: 2px solid rgb(50, 55, 50);
        cursor: pointer;
        width: 32px;
        height: 32px;
        text-align: center;
        padding-top: 2px;
        background: #fff;
        border-radius: 50%;
        z-index: 999;
    }
    .dropzone .clear-dropzone:hover {
        background: rgb(50, 55, 50);
        color: #fff;
    }
    .dropzone .image-preview {
        box-shadow: 0 0 4px rgba(0,0,0,.15);
        margin: 5px;
        height: 120px;
        margin-bottom: 1rem;
    }
    .dropzone .image-preview > img{
        max-height: 100%;
        width:auto;
        image-rendering: -webkit-optimize-contrast;
        border-bottom: 1px solid ${colors['grey300']};
    }
    .dropzone .image-preview .size {
        font-size: 11px;
        padding: 2px;
        font-weight: bold;
    }

    .dropzone .error-box {
        position:absolute;
        bottom: 0;
        width: 100%;
        padding: 10px;
        color: #fff;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        background: ${colors['red500']};
        transform: translate(0, 100%);
        visibility: hidden;
        transition: .25s;
    }
    .dropzone .error-box.show {
        transform: translate(0, 0);
        visibility: visible;
    }

    /** Lossy/Lossless Modes **/
    .dropzone-wrap .box-foot .modes > .btn{
        min-height: 66px;
        padding: 1rem 3rem;
        border: 1px solid ${colors['grey300']};
        box-shadow: 0 1px 8px rgba(0,0,0,.12);
        background: #fff;
        cursor: pointer;
    }
    .dropzone-wrap .box-foot .modes > .btn.lossless {
        border-radius: 2px 0 0 2px;
    }
    .dropzone-wrap .box-foot .modes > .btn.lossy {
        border-radius: 0 2px 2px 0;
    }
    .dropzone-wrap .box-foot .modes > .btn.active {
        box-shadow: inset 0 0 8px rgba(0,0,0,.1);
        font-weight: 600;
    }

    /** Compress Button **/
    .dropzone-wrap .box-foot .compress-btn {
        border: 1px solid #212121;
        min-width: 300px;
        height: 100%;
        min-height: 66px;
        background: #000;
        color: #fff;

        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,.3), 0 4px 16px rgba(0,0,0,.1);
    }
    .dropzone-wrap .box-foot .compress-btn[disabled] {
        color: #d2d7d3;
        border-color: #d2d7d3;
        cursor:not-allowed;
        box-shadow: none;
    }

    @media(max-width: 480px) {
        .dropzone-wrap .dropzone {
            min-height: 320px;
        }
        .dropzone-wrap .box-foot .compress-btn {
            width: 100%;
            margin-top: .6em;
        }
        .dropzone-wrap .box-foot .modes {width: 100%}
        .dropzone-wrap .box-foot .modes > .btn {
            width: 50%;
        }
    }

`
