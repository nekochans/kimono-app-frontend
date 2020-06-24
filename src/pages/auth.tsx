import React from 'react';
import { NextPageContext } from 'next';
import Link from 'next/link';
import { setCookie } from '../infrastructure/Cookie';

type Props = {
  authToken: string;
};

const AuthPage: React.FC<Props> = ({ authToken }: Props) => {
  return (
    <>
      <p>Set Auth Token in a Cookie AuthToken is...[{authToken}]</p>
      <p>
        <Link href="/authed">Go To authed Page.</Link>
      </p>
    </>
  );
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
