import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { urlList } from '../constants/url';
import { fetchCognitoJsonWebKeys } from '../infrastructure/repository/CognitoJwkRepository';
import { verifyIdToken } from '../domain/cognito/token';

type AuthenticatedState = {
  authenticated: boolean;
  idToken: string;
};

/**
 * ログイン状態かどうかを確認しログイン状態でなければログインページにリダイレクト
 */
export const useMightAuthenticationRedirect = (): AuthenticatedState => {
  const [authenticated, setAuthenticated] = useState(false);
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    let unmounted = false;

    const mightAuthenticationRedirect = async () => {
      try {
        const cognitoUserSession = await Auth.currentSession();

        if (!cognitoUserSession.isValid()) {
          if (window) {
            window.location.href = urlList.login;
          }
        }

        await verifyIdToken(
          cognitoUserSession.getIdToken().getJwtToken(),
          fetchCognitoJsonWebKeys,
        );

        if (!unmounted) {
          setIdToken(cognitoUserSession.getIdToken().getJwtToken());
          setAuthenticated(true);
        }
      } catch (e) {
        if (window) {
          window.location.href = urlList.login;
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    mightAuthenticationRedirect();

    return () => {
      unmounted = true;
    };
  }, [authenticated, idToken]);

  return {
    authenticated,
    idToken,
  };
};
