import React from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useCognitoState } from '../ducks/cognito/selectors';
import {
  loginRequest,
  resendCreateAccountRequest,
} from '../ducks/cognito/asyncActions';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCognitoState();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const changedEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value.trim());
  const changedPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value.trim());

  const inputStyle = {
    width: 250,
    height: 25,
  };

  const errorStyle = {
    color: 'red',
  };

  const handleLoginSubmit = () => {
    if (!email || !password) {
      return;
    }

    dispatch(loginRequest({ email, password }));
  };

  const handleResendCreateAccountSubmit = () => {
    if (!email) {
      return;
    }

    dispatch(resendCreateAccountRequest({ email }));
  };

  return (
    <>
      <h1>ログイン</h1>
      <form method="post">
        <input
          style={inputStyle}
          type="text"
          placeholder="email"
          onChange={changedEmailHandler}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="password"
          onChange={changedPasswordHandler}
        />
        <button type="button" onClick={handleLoginSubmit}>
          ログイン
        </button>
        <p>
          <Link href="/password/reset">パスワードを忘れた方はこちら</Link>
        </p>
        {state.errorName === 'NotConfirmedError' ? (
          <button type="button" onClick={handleResendCreateAccountSubmit}>
            認証メールを再送信する
          </button>
        ) : (
          ''
        )}
      </form>
      {state.errorMessage ? (
        <div style={errorStyle}>{state.errorMessage}</div>
      ) : (
        ''
      )}
      {state.loading ? <p>通信中</p> : ''}
      {state.successfulResendAccountCreateRequest ? (
        <div>
          {state.sentEmail} に認証メールを送信しました。メールをご確認下さい。
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginPage;
