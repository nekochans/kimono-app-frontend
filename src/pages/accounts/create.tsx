import React from 'react';
import { useDispatch } from 'react-redux';
import { useCognitoState } from '../../redux/cognito/selectors';
import {
  createAccountRequest,
  resendCreateAccountRequest,
} from '../../redux/cognito/asyncActions';

const AccountCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCognitoState();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const changedEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value.trim());
  const changedPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value.trim());

  const handleCreateAccountSubmit = () => {
    if (!email || !password) {
      return;
    }

    dispatch(createAccountRequest({ email, password }));
  };

  const handleResendCreateAccountSubmit = () => {
    if (!email) {
      return;
    }

    dispatch(resendCreateAccountRequest({ email }));
  };

  const inputStyle = {
    width: 300,
    height: 25,
  };

  const errorStyle = {
    color: 'red',
  };

  return (
    <>
      <h1>Accountを作成する</h1>
      <form method="post">
        <input
          type="text"
          placeholder="email"
          onChange={changedEmailHandler}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="password"
          onChange={changedPasswordHandler}
          style={inputStyle}
        />
        <button type="button" onClick={handleCreateAccountSubmit}>
          アカウント作成用の認証メールを送信する
        </button>
        {state.errorName === 'AccountAlreadyExistsError' ? (
          <button type="button" onClick={handleResendCreateAccountSubmit}>
            認証メールを再送信する
          </button>
        ) : (
          ''
        )}
      </form>
      {state.loading ? <p>通信中</p> : ''}
      {state.successfulAccountCreateRequest ||
      state.successfulResendAccountCreateRequest ? (
        <div>
          {state.sentEmail} に認証メールを送信しました。メールをご確認下さい。
        </div>
      ) : (
        ''
      )}
      {state.error ? <div style={errorStyle}>{state.errorMessage}</div> : ''}
    </>
  );
};

export default AccountCreatePage;
