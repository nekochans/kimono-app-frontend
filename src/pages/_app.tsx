import React, { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import createStore from '../ducks/createStore';

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
  },
});

const kimonoApp = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <Provider store={createStore()}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default kimonoApp;
