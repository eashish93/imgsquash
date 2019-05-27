import css from 'styled-jsx/css';
import colors from './colors';

export default css.global`
    html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    body {
        letter-spacing: .042rem;
        font-family: 'Cairo', "Helvetica Neue", -apple-system, BlinkMacSystemFont,  Roboto,  sans-serif;
    }
    *:focus {
        outline: none!important;
    }
    .btn:focus {
        box-shadow: none;
    }
    pre {
        border: 1px solid ${colors['grey200']}
        background: ${colors['amber50']};
        padding: .5rem 1rem;
        font-size: 12px;
    }
    code {
        font-size: 12px;
    }
    .xsmall {
        font-size: 12px!important;
    }
    .alert {
        padding: .5rem 1rem;
        font-size: 14px;
        border: none;
    }
    .alert-danger {
        background: ${colors['red500']};
        color: #fff;
    }
    .alert .close {
        margin-top: -3px;
        cursor: pointer;
    }

    a:hover {
        text-decoration: none;
    }
    main#main {
        min-height: 75vh;
    }
    .site-head  {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .site-head .site-nav li {
        float: left;
        margin-right: 15px;
    }
    .site-head .site-nav li:last-child {
        margin-right: 0;
    }
    .site-head .site-nav a{
        border: 2px solid ${colors['grey800']};
        padding: 8px 1.5rem;
        display: inline-block;
        border-radius: 3px;
        font-size: 14px;
        text-transform: uppercase;
        font-weight: bold;
        ${'' /* text-shadow: .2px .2px rgba(50,50,50,1); */}
        color: ${colors['grey800']};

    }
    .site-head .site-nav a:hover {
        box-shadow: inset 0 0 8px rgba(0,0,0,.12);
    }
    .site-head .site-nav a.active {
        border-color: ${colors['grey900']}
    }
    /** header **/
    @media (max-width: 480px) {
        .site-head {
            text-align: center;
            justify-content: center;
        }
    }
    .site-foot .links > a{
        color: #304FFE;

        font-weight: 400;
        margin-right: 1.5em;
    }
    .site-foot .links > a:last-child {
        margin-right: 0;
    }
    .site-foot .links > a:hover {
        color: #2962FF;
    }


    /** Override container width for large screen  */
    @media(min-width: 1200px) {
      .container {
        max-width: 1060px;
      }
    }
`