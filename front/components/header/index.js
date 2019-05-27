import Logo from '../logo';
import { withRouter } from 'next/router';


const Header = ({ router }) => (
    <header className="site-head pt-4 mt-2 pb-4">
        <a className="logo" href="/">
            <Logo />
            <p style={{ fontSize: '20px', color: "#212121" }}>Compress images to smallest size</p>
        </a>
        <ul className="site-nav list-unstyled">
            <li><a href="/url-paster" className={`${router.pathname === '/url-paster' ? 'active' : ''}`}>URL Paster</a></li>
        </ul>
    </header>
)

export default withRouter(Header);
