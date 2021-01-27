import jwkToPem from 'jwk-to-pem';
import jwt from 'jsonwebtoken';
import {
  Jwk,
  JwkList,
  CognitoPublicPemList,
  CognitoPublicPem,
  CognitoIdToken,
} from './entity';
import {
  cognitoRegion,
  cognitoUserPoolClientId,
  cognitoUserPoolId,
} from './environmentVariable';
import { FetchCognitoJsonWebKeys } from './repository';
import CognitoVerifyTokenError from '../error/cognito/CognitoVerifyTokenError';

const createPublicPem = (jwkList: JwkList) => {
  const region = cognitoRegion();
  const userPoolId = cognitoUserPoolId();

  return jwkList.keys.reduce(
    (cognitoPublicPemList: CognitoPublicPemList, key: Jwk) => {
      if (!cognitoPublicPemList[region]) {
        // eslint-disable-next-line no-param-reassign
        cognitoPublicPemList[region] = { [userPoolId]: {} };
      }

      if (!cognitoPublicPemList[region][userPoolId]) {
        // eslint-disable-next-line no-param-reassign
        cognitoPublicPemList[region][userPoolId] = {};
      }

      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unsafe-assignment
      cognitoPublicPemList[region][userPoolId][key.kid] = jwkToPem(key);

      return cognitoPublicPemList;
    },
    {},
  );
};

const extractPem = (
  cognitoPublicPemList: CognitoPublicPemList,
  token: string,
): CognitoPublicPem => {
  const jwtTokenList = token.split('.');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const header = JSON.parse(Buffer.from(jwtTokenList[0], 'base64').toString());

  const region = cognitoRegion();
  const userPoolId = cognitoUserPoolId();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return cognitoPublicPemList[region][userPoolId][header.kid];
};

// eslint-disable-next-line import/prefer-default-export
export const verifyIdToken = async (
  idToken: string,
  fetchCognitoJsonWebKeys: FetchCognitoJsonWebKeys,
): Promise<CognitoIdToken> => {
  // .well-known/jwks.json からJWKセットを取得
  // ここはCache出来るかも
  const jwkList = await fetchCognitoJsonWebKeys();

  // PEM形式のRSA鍵を生成する
  const publicPemList = createPublicPem(jwkList);

  // トークンに使われているPEM形式のRSA鍵を取り出す
  const pem = extractPem(publicPemList, idToken);

  // IDトークンの検証を行う
  const cognitoIdToken = jwt.verify(idToken, pem, {
    algorithms: ['RS256'],
  }) as CognitoIdToken;

  // トークンの発行元を確認
  if (
    cognitoIdToken.iss !==
    `https://cognito-idp.${cognitoRegion()}.amazonaws.com/${cognitoUserPoolId()}`
  ) {
    return Promise.reject(new CognitoVerifyTokenError());
  }

  // トークンが自身のClientIDに対して発行されているか確認する
  if (cognitoIdToken.aud !== cognitoUserPoolClientId()) {
    return Promise.reject(new CognitoVerifyTokenError());
  }

  // トークン種別が正しいか確認する
  if (cognitoIdToken.token_use !== 'id') {
    return Promise.reject(new CognitoVerifyTokenError());
  }

  return cognitoIdToken;
};
