import React from 'react';
import { NextPageContext } from 'next';
import { setCookie } from '../infrastructure/Cookie';

type Props = {
  authToken: string;
};

const AuthPage: React.FC<Props> = ({ authToken }: Props) => {
  return <p>Auth Token is... {authToken}</p>;
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const authToken: string = Math.random().toString(32).substring(2);

  setCookie({ key: 'authToken', value: authToken }, ctx);

  return {
    props: {
      authToken,
    },
  };
};

export default AuthPage;
