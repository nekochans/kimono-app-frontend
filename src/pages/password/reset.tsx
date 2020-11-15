import React from 'react';
import { useDispatch } from 'react-redux';
import { useCognitoState } from '../../redux/cognito/selectors';
import { passwordResetRequest } from '../../redux/cognito/asyncActions';

const PasswordResetPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCognitoState();

  const [email, setEmail] = React.useState<string>('');

  const changedEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value.trim());

  const handlePasswordResetSubmit = () => {
    if (!email) {
      return;
    }

    dispatch(passwordResetRequest({ email }));
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
      <h1>パスワードをリセットする</h1>
      <form method="post">
        <input
          type="text"
          placeholder="email"
          onChange={changedEmailHandler}
          style={inputStyle}
        />
        <button type="button" onClick={handlePasswordResetSubmit}>
          パスワードリセット用のリンクを送信する
        </button>
      </form>
      {state.successfulPasswordResetRequest ? (
        <div>
          {state.sentEmail}{' '}
          にパスワードリセット用の認証メールを送信しました。メールをご確認下さい。
        </div>
      ) : (
        ''
      )}
      {state.error ? <div style={errorStyle}>{state.errorMessage}</div> : ''}
    </>
  );
};

export default PasswordResetPage;
