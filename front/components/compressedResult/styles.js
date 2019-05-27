import css from 'styled-jsx/css';
import colors from '../../shared/colors';


export default css`

    .compressed-result {
        min-height: 200px;
        border: 1px solid ${colors['grey200']};
        box-shadow: 0 2px 8px rgba(0,0,0,.08);
        padding:2rem;
        border-radius: 4px;
        display: flex;
        margin-bottom: 1.5rem;
        justify-content: center;
        flex-direction: column;
    }
    .compressed-result li {
        display: flex;
        flex-direction:row;
        margin-bottom: 1rem;
    }
    .compressed-result li:last-child {
        margin-bottom: 0;
    }
    .compressed-result li > img {
        margin-right: 1.2rem;
        height: 60px;
        border-radius: 3px;
        float: left;
    }
    .compressed-result .file {
        float: left;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        font-size: 14px;
        align-items: center;
    }
    .compressed-result .file .progress-wrap{
        flex: 1;
        margin-right: 2.2rem;
        margin-left: .8rem;
    }
    .compressed-result .file .progress-wrap .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
    }
    .compressed-result .file .size,
    .compressed-result .file .status {
        margin-right: 2.2rem;
    }
    .compressed-result li .progress {
        height: 5px;
        box-shadow: inset 0 2px 5px rgba(0,0,0,.1), 0 1px 0 rgba(255,255,255,.1);
    }
    /** Uploading State **/
    .compressed-result li .progress-bar {
        transition: .2s ease-in;
        background: ${colors['greenA700']};
        border-radius: 4px;
        background: linear-gradient(to left, ${colors['green700']}, ${colors['greenA400']});
    }
    /** Compressed State **/
    .compressed-result li .progress-bar.compressing {
         background-color: #A5D6A7;
          background-image: linear-gradient(125deg, ${colors['green500']} 25%, transparent 25%, transparent 50%, ${colors['green500']} 50%, ${colors['green500']} 75%, transparent 75%, transparent);
          background-size: 20px 20px;
          animation: progress-bar-stripes .8s linear infinite;
    }
    /** Error state **/
    .compressed-result li .progress-bar.error {
        background: ${colors['red500']}!important;
    }
    .compressed-result li .progress-bar.done {
        background: ${colors['green500']}
    }

    .compressed-result .download-single-btn {
        background: ${colors['pinkA400']};
        color: #fff;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,.1);
    }
    .compressed-result .download-single-btn[disabled] {
        cursor: not-allowed;
        opacity: .4;
    }



    @keyframes progress-bar-stripes {
      to { background-position: 20px 0; }
      from { background-position: 0 0; }
    }

    .compressed-result__final {
        border: 1px solid ${colors['grey200']};
        box-shadow: 0 2px 8px rgba(0,0,0,.08);
        padding: 1rem 2rem;
    }


    /** Download and share buttons (cta) **/
    :global(.cta-btns .download-all),
    :global(.cta-btns .start-again) {
        border-radius: 2px;
        box-shadow: 0 4px 12px rgba(0,0,0,.12);
        height: 56px;
        cursor:pointer;
        font-size: 18px;
        width: 100%;
        text-align: center;
        background: #fff;
    }
    :global(.cta-btns .download-all) {
        color: #fff;
        background: ${colors['indigoA700']};
        border-color: ${colors['indigoA700']}
    }
    :global(.cta-btns .download-all[disabled]),
    :global(.cta-btns .start-again[disabled]) {
        cursor: not-allowed;
    }

    :global(.cta-btns .start-again) {
        background: ${colors['greenA700']};
        color: #fff;
        border-color: ${colors['greenA700']}
    }
    :global(.cta-btns .start-again:hover) {
        box-shadow: 0 4px 12px rgba(0,0,0,.12), inset 0 0 8px rgba(0,0,0,.06), inset 0 0 20px rgba(0,0,0,.05);
    }
    :global(.cta-btns .start-again:focus),
    :global(.cta-btns .download-all:focus) {
        box-shadow:0 4px 12px rgba(0,0,0,.12), inset 0 0 8px rgba(0,0,0,.1), inset 0 0 120px 2px rgba(0,0,0,.08);
    }

    /** MEdia queries **/
    @media (max-width: 480px) {
        .compressed-result {
            padding: .8rem 1rem;
        }
        .compressed-result .file .progress-wrap .name {
            max-width: 120px;
        }
        .compressed-result .file .progress-wrap {
            margin-right: 1rem;
            margin-left: 0;
        }
    }

`
