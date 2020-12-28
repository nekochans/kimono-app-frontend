// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'jest-fetch-mock';
import { fetchCognitoJsonWebKeys } from '../CognitoJwkRepository';

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
});
