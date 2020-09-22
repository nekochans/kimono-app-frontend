import React from 'react';
import { useDispatch } from 'react-redux';
import { useCognitoState } from '../ducks/cognito/selectors';
import { loginRequest } from '../ducks/cognito/asyncActions';

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

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      return;
    }

    await dispatch(loginRequest({ email, password }));
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
        {state.errorName === 'NotConfirmedError' ? (
          <button type="button">認証メールを再送信する</button>
        ) : (
          ''
        )}
      </form>
      {state.errorMessage ? (
        <div style={errorStyle}>{state.errorMessage}</div>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginPage;
