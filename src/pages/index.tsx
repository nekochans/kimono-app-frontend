import React from 'react';
import Link from 'next/link';
import AppTitle from '../components/AppTitle';
import { urlList } from '../constants/url';

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
            <Link href={urlList.createAccount}>アカウント作成</Link>
          </li>
          <li>
            <Link href={urlList.login}>ログイン</Link>
          </li>
          <li>
            <Link href={urlList.my}>
              Myページ（ログインしないと見れません）
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default IndexPage;
