import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from '../shared/withRedux';
import globalStyles from '../shared/globalStyles';


class MyApp extends App {
    render() {
        // here `pageProps` arrive from default App class. See: https://github.com/zeit/next.js#custom-app (or next.js source)
        const { Component, pageProps, store } = this.props;

        return (<Container>
            <Provider store={store}>
                <style jsx global>{globalStyles}</style>
                <Component {...pageProps} />
            </Provider>
        </Container>)
    }
}
export default withRedux(MyApp);
