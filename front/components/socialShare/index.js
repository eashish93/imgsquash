
export default ({ compressedSize }) => (

    <div className="social-share">
        <p className='small mb-2 font-weight-bold'>Share your results:</p>
        <a className="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fimgsquash.com" target="_blank">
            <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"><div className="resp-sharing-button__icon resp-sharing-button__icon--solid">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg></div>Facebook</div>
        </a>

        <a className="resp-sharing-button__link" href={`https://twitter.com/intent/tweet/?text=I%20Just%20Save%20${compressedSize}%20with%20%23imgsquash.&amp;url=https%3A%2F%2Fimgsquash.com`} target="_blank">
            <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"><div className="resp-sharing-button__icon resp-sharing-button__icon--solid">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" /></svg></div>Twitter</div>
        </a>
        <style jsx>{`
            .resp-sharing-button__link,
            .resp-sharing-button__icon {
              display: inline-block
            }

            .resp-sharing-button__link {
              text-decoration: none;
              color: #fff;
              margin-right: 0.5em
            }

            .resp-sharing-button {
              border-radius: 5px;
              transition: 25ms ease-out;
              padding: 0.5em 0.75em;
            }

            .resp-sharing-button__icon svg {
              width: 1em;
              height: 1em;
              margin-right: 0.4em;
              vertical-align: top
            }

            .resp-sharing-button--small svg {
              margin: 0;
              vertical-align: middle
            }

            /* Non solid icons get a stroke */
            .resp-sharing-button__icon {
              stroke: #fff;
              fill: none
            }

            /* Solid icons get a fill */
            .resp-sharing-button__icon--solid,
            .resp-sharing-button__icon--solidcircle {
              fill: #fff;
              stroke: none
            }

            .resp-sharing-button--twitter {
              background-color:  rgb(29, 191, 242);
            }

            .resp-sharing-button--twitter:hover {
              background-color: #2795e9
            }


            .resp-sharing-button--facebook {
              background-color: #3b5998
            }

            .resp-sharing-button--facebook:hover {
              background-color: #2d4373
            }


            .resp-sharing-button--facebook {
              background-color: #3b5998;
              border-color: #3b5998;
            }

            .resp-sharing-button--facebook:hover,
            .resp-sharing-button--facebook:active {
              background-color: #2d4373;
              border-color: #2d4373;
            }



            .social-share > a {
                font-size: 11px;
            }
            .social-share > a .resp-sharing-button {border-radius: 3px;}
            .social-share > a:hover  {
                color: #fff;
            }
            .social-share > a svg {transform: translate(0, 3px)}
        `}</style>
    </div>

)
