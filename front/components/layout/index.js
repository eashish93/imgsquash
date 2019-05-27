import Header from '../header';
import Footer from '../footer';
import Head from 'next/head';

export default ({ children, title, metaDescription, path }) => (
    <div className="container">
        <Head>
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            <meta property="og:url" content={`https://imgsquash.com${path ? path : ''}`} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content="https://imgsquash.com/static/images/website-logo.jpg" />
        </Head>
        <Header />
        {children}
        <Footer />
    </div>
)
