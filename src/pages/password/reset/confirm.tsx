import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { useCognitoState } from '../../../ducks/cognito/selectors';
import { passwordResetConfirmRequest } from '../../../ducks/cognito/asyncActions';

type Props = {
  user: { cognitoUserName: string };
  confirmationCode: string;
};

const PasswordResetConfirmPage: React.FC<Props> = ({
  user,
  confirmationCode,
}: Props) => {
  const dispatch = useDispatch();
  const state = useCognitoState();

  const [newPassword, setNewPassword] = React.useState<string>('');

  const changedNewPasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setNewPassword(event.target.value.trim());

  const handleNewPasswordSubmit = () => {
    if (!user?.cognitoUserName || !confirmationCode || !newPassword) {
      // TODO ここでreturnすると不具合があった際に分かりにくいのでエラー用Componentを表示させる
      return;
    }

    dispatch(
      passwordResetConfirmRequest({
        cognitoUserName: user.cognitoUserName,
        confirmationCode,
        newPassword,
      }),
    );
  };

  const inputStyle = {
    width: 250,
    height: 25,
  };

  const errorStyle = {
    color: 'red',
  };

  // TODO ちゃんとしたエラー表示用のComponentを作成して表示させる
  return (
    <>
      <h1>パスワードリセットを完了させる</h1>
      <form method="post">
        <input
          style={inputStyle}
          type="password"
          placeholder="新しいパスワード"
          onChange={changedNewPasswordHandler}
        />
        <button type="button" onClick={handleNewPasswordSubmit}>
          パスワードリセットを完了させる
        </button>
      </form>
      {state.error ? <div style={errorStyle}>{state.errorMessage}</div> : ''}
      {state.error || state.errorMessage ? (
        <Link href="/password/reset">パスワードリセットを最初からやり直す</Link>
      ) : (
        ''
      )}
      {state.successfulPasswordResetConfirm ? (
        <div>
          新しいパスワードに変更しました。{' '}
          <Link href="/login">ログインページ</Link> からログインを行って下さい。
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userName, code } = context.query;

  if (userName === undefined || code === undefined) {
    return {
      props: {},
    };
  }

  return {
    props: { user: { cognitoUserName: userName }, confirmationCode: code },
  };
};

export default PasswordResetConfirmPage;
