import React from 'react';
import { NextPageContext } from 'next';
import { findCookies } from '../infrastructure/Cookie';

type Props = {
  authToken: string;
};

const AuthedPage: React.FC<Props> = ({ authToken }: Props) => {
  return (
    <>
      {authToken ? (
        <p>Auth Token in the Cookie is... {authToken}</p>
      ) : (
        <p>There is no AuthToken in the cookie.</p>
      )}
    </>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = findCookies<Props>(ctx);
  const authToken = cookies.authToken ?? '';

  return {
    props: {
      authToken,
    },
  };
};

export default AuthedPage;
