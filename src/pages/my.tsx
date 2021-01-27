import React from 'react';
import Link from 'next/link';
import useMightAuthenticationRedirect from '../hooks/useMightAuthenticationRedirect';
import { urlList } from '../constants/url';

const MyPage: React.FC = () => {
  const authenticatedState = useMightAuthenticationRedirect();

  return authenticatedState.authenticated ? (
    <>
      <h1>🐱MyPage🐱</h1>
      <Link href={urlList.logout}>ログアウト</Link>
    </>
  ) : (
    <h1>通信中です</h1>
  );
};

export default MyPage;
