import React from 'react';
import App from 'next/app';
import Page, { DefaultPageProvider } from '../components/Layout/PageProvider';
import 'react-image-crop/lib/ReactCrop.scss';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx); // crawl the pages fetch that data then return that data to this.props
        }
        pageProps.query = ctx.query; // this exposes the query to the user
        return { pageProps }; //when you return here in getInitalProps it exposes it in props..
    }
    render() {
        const { Component, pageProps, router } = this.props;
        if (router.pathname === "/" || router.pathname === "/login" || router.pathname ==="/signup")  return (
            <DefaultPageProvider>
                <Component {...pageProps}/>
            </DefaultPageProvider>
        );
        return (
            <Page {...router}>
                <Component {...pageProps}/>
            </Page>
        );
    }
}



export default MyApp;