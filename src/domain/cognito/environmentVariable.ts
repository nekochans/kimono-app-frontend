export const cognitoRegion = (): string =>
  process.env.NEXT_PUBLIC_COGNITO_REGION
    ? process.env.NEXT_PUBLIC_COGNITO_REGION
    : '';

export const cognitoUserPoolId = (): string =>
  process.env.NEXT_PUBLIC_USER_POOL_ID
    ? process.env.NEXT_PUBLIC_USER_POOL_ID
    : '';

export const cognitoUserPoolClientId = (): string =>
  process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID
    ? process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID
    : '';

type AmplifyConfig = {
  Auth: {
    region: string;
    userPoolId: string;
    userPoolWebClientId: string;
    mandatorySignIn: boolean;
    authenticationFlowType:
      | 'USER_SRP_AUTH'
      | 'USER_PASSWORD_AUTH'
      | 'CUSTOM_AUTH';
    cookieStorage: {
      domain: string;
      path: string;
      expires: number;
      secure: boolean;
    };
  };
  oauth: {
    domain: string;
    scope: string[];
    redirectSignIn: string;
    redirectSignOut: string;
    responseType: string;
  };
  ssr: boolean;
};

export const amplifyConfig = (): AmplifyConfig => ({
  Auth: {
    region: cognitoRegion(),
    userPoolId: cognitoUserPoolId(),
    userPoolWebClientId: cognitoUserPoolClientId(),
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH',
    cookieStorage: {
      domain: String(process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN),
      path: '/',
      expires: 30,
      secure: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN !== 'localhost',
    },
  },
  oauth: {
    domain: String(process.env.NEXT_PUBLIC_COGNITO_DOMAIN),
    scope: ['profile', 'email', 'openid'],
    redirectSignIn: `${String(process.env.NEXT_PUBLIC_APP_URL)}/idp/callback`,
    redirectSignOut: `${String(process.env.NEXT_PUBLIC_APP_URL)}/idp/logout`,
    responseType: 'code',
  },
  ssr: true,
});
