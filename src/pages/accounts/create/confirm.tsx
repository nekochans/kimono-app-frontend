import React from 'react';
import { GetServerSideProps } from 'next';
import { Auth } from 'aws-amplify';

type Props = {
  user: { sub: string };
  error: Error;
};

const AccountCreateConfirmPage: React.FC<Props> = ({ user, error }: Props) => {
  // TODO ちゃんとしたエラー表示用のComponentを作成して表示させる
  return (
    <>
      {error ? <div>エラーが発生しました。 {error.message}</div> : ''}
      {user ? <div>アカウント登録が完了しました！ {user.sub}</div> : ''}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { sub, code } = context.query;

    if (sub === undefined || code === undefined) {
      return {
        props: {},
      };
    }

    // 返り値はSUCCESSという文字列が返ってくるだけ
    await Auth.confirmSignUp(String(sub), String(code));

    return { props: { user: { sub } } };
  } catch (e) {
    return { props: { error: e } };
  }
};

export default AccountCreateConfirmPage;
