
export default () => (
    <footer className="site-foot small pb-4 d-flex flex-row justify-content-between flex-wrap">
        <div>
            <h5 className="d-inline-block" style={{ transform: 'translate(0, 5px)' }}>&copy;</h5> {(new Date).getFullYear()},
            <span className="font-weight-bold">&nbsp;Imgsquash.com</span>
        </div>
        <div className="links">
            <a href="/about">About</a>
            <a href="mailto:example@gmail.com">Contact</a>
            <a href="https://twitter.com/imgsquash" target="_blank">On Twitter</a>
        </div>
    </footer>
)
