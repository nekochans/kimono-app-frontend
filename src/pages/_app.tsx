import React, { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import createStore from '../redux/createStore';
import { amplifyConfig } from '../domain/cognito/environmentVariable';

Amplify.configure(amplifyConfig());

const kimonoApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <Provider store={createStore()}>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      {/* eslint-disable react/jsx-props-no-spreading */}
    </Provider>
  );
};

export default kimonoApp;
