export type Jwk = {
  alg: 'RS256';
  e: 'AQAB';
  kid: string;
  kty: 'RSA';
  n: string;
  use: 'sig';
};

export type JwkList = {
  keys: Jwk[];
};

export type CognitoPublicPem = string;

export type CognitoPublicPemList = {
  [region: string]: {
    [userPoolId: string]: {
      [kid: string]: CognitoPublicPem;
    };
  };
};

export type CognitoIdToken = {
  // eslint-disable-next-line camelcase
  at_hash: string;
  sub: string;
  'cognito:groups': string[];
  email: string;
  // eslint-disable-next-line camelcase
  email_verified: false;
  iss: string;
  aud: string;
  identities?: {
    userId: string;
    providerName: string;
    providerType: string;
    issuer: string | null;
    primary: string;
    dateCreated: string;
  }[];
  // eslint-disable-next-line camelcase
  token_use: 'id';
  // eslint-disable-next-line camelcase
  auth_time: number;
  exp: number;
  iat: number;
};
