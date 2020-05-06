import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import createStore from '../ducks/createStore';

const kimonoApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={createStore()}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default kimonoApp;
