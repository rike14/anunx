import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SessionProvider } from "next-auth/react";
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import CheckAuth from '../src/components/CheckAuth';
import { ToastyProvider } from '../src/contexts/Toasty';
import theme from '../src/theme';

export default function MyApp({ 
  Component,
  pageProps: { ...pageProps }
}) {

  return (
    <React.Fragment>
      <Head>
        <title>Anunx</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider 
        session={pageProps} 
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        <ThemeProvider theme={theme}>
          <ToastyProvider>
          <CssBaseline />
          {
            Component.requireAuth
            ? <CheckAuth Component={Component} pageProps={pageProps} />
            : <Component {...pageProps} />
          }
          </ToastyProvider>
        </ThemeProvider>
      </SessionProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};