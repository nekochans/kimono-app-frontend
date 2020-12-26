import React, { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import createStore from '../redux/createStore';

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    cookieStorage: {
      domain: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN,
      path: '/',
      expires: 30,
      secure: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN !== 'localhost',
    },
  },
  oauth: {
    domain: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    scope: ['profile', 'email', 'openid'],
    redirectSignIn: `${String(process.env.NEXT_PUBLIC_APP_URL)}/idp/callback`,
    redirectSignOut: `${String(process.env.NEXT_PUBLIC_APP_URL)}/idp/logout`,
    responseType: 'code',
  },
  ssr: true,
});

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
