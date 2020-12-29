// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'jest-fetch-mock';
import { fetchCognitoJsonWebKeys } from '../CognitoJwkRepository';
import FetchCognitoJsonWebKeysError from '../../../domain/error/cognito/FetchCognitoJsonWebKeysError';

describe('CognitoJwkRepository.ts Functions TestCases', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should be able to fetch the JWKs', async () => {
    const mockBody = {
      keys: [
        {
          alg: 'RS256',
          e: 'AQAB',
          kid: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa=',
          kty: 'RSA',
          n: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          use: 'sig',
        },
        {
          alg: 'RS256',
          e: 'AQAB',
          kid: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb=',
          kty: 'RSA',
          n: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
          use: 'sig',
        },
      ],
    };

    const mockParams = {
      status: 200,
      statusText: 'OK',
    };

    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams);

    const jwkList = await fetchCognitoJsonWebKeys();

    expect(jwkList).toStrictEqual(mockBody);
  });

  it('should return an Error because the HTTP status is not 200', async () => {
    const mockBody = { message: 'Internal Server Error' };

    const mockParams = {
      status: 500,
      statusText: 'Internal Server Error',
    };

    fetch.mockResponseOnce(JSON.stringify(mockBody), mockParams);

    const jwkListPromise = fetchCognitoJsonWebKeys();

    await expect(jwkListPromise).rejects.toThrowError(
      FetchCognitoJsonWebKeysError,
    );
  });
});
