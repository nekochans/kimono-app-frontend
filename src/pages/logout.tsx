import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cognitoSlice from '../redux/cognito/slice';
import { urlList } from '../constants/url';

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    let unmounted = false;

    const logout = async () => {
      try {
        await Auth.signOut({ global: true });
      } finally {
        if (!unmounted) {
          dispatch(cognitoSlice.actions.loggedOut());
        }

        await router.push(urlList.top);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    logout();

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>🐱ログアウトしています🐱</h1>
    </>
  );
};

export default LogoutPage;
