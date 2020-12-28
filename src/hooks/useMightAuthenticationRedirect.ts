import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { urlList } from '../constants/url';

type AuthenticatedState = {
  authenticated: boolean;
  idToken: string;
};

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
