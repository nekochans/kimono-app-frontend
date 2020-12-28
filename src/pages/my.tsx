import React from 'react';
import { useMightAuthenticationRedirect } from '../hooks/useMightAuthenticationRedirect';

const MyPage: React.FC = () => {
  const authenticatedState = useMightAuthenticationRedirect();

  return authenticatedState.authenticated ? (
    <h1>🐱MyPage🐱</h1>
  ) : (
    <h1>通信中です</h1>
  );
};

export default MyPage;
