import {
  cognitoRegion,
  cognitoUserPoolId,
} from '../../domain/cognito/environmentVariable';
import { JwkList } from '../../domain/cognito/entity';
import FetchCognitoJsonWebKeysError from '../../domain/error/cognito/FetchCognitoJsonWebKeysError';

// eslint-disable-next-line import/prefer-default-export
export const fetchCognitoJsonWebKeys = async (): Promise<JwkList> => {
  const url = `https://cognito-idp.${cognitoRegion()}.amazonaws.com/${cognitoUserPoolId()}/.well-known/jwks.json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new FetchCognitoJsonWebKeysError();
  }

  return (await response.json()) as JwkList;
};
