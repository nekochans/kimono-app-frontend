import React from 'react';
import Link from 'next/link';
import AppTitle from '../components/AppTitle';

export const config = {
  amp: true,
};

const IndexPage: React.FC = () => {
  const text = '🐱着物アプリ🐱';

  return (
    <>
      <AppTitle text={text} />
      <div>
        <ul>
          <li>
            <Link href="/accounts/create">アカウント作成</Link>
          </li>
          <li>
            <Link href="/login">ログイン</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IndexPage;
