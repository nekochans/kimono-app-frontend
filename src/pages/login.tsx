import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCognitoState } from '../redux/cognito/selectors';
import {
  loginRequest,
  resendCreateAccountRequest,
} from '../redux/cognito/asyncActions';
import { urlList } from '../constants/url';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCognitoState();
  const router = useRouter();

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

  useEffect(() => {
    const redirectToAfterLoggedIn = async () => {
      await router.push(urlList.my);
    };

    if (state.successfulLoginRequest) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      redirectToAfterLoggedIn();
    }
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
