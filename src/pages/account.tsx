import React from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import {
  AuthState,
  onAuthUIStateChange,
  CognitoUserInterface,
} from '@aws-amplify/ui-components';
import { useDispatch } from 'react-redux';
import accountSlice from '../ducks/account/slice';
import { useAccountState } from '../ducks/account/selectors';

const AccountPage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useAccountState().account;

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      dispatch(accountSlice.actions.setAuthState(nextAuthState));
      const user = authData as CognitoUserInterface;

      if (user !== undefined && user.username) {
        dispatch(accountSlice.actions.setName(user.username));
      }
    });
  });

  return state.authState === AuthState.SignedIn && state.name ? (
    <div className="App">
      <div>Hello, {state.name}</div>
      <AmplifySignOut />
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        headerText="Sign Up"
        slot="sign-up"
        usernameAlias="username"
        formFields={[
          {
            type: 'username',
            label: 'ユーザ名(必須)',
            placeholder: '',
            required: true,
          },
          {
            type: 'email',
            label: 'メールアドレス(必須)',
            placeholder: '',
            required: true,
          },
          {
            type: 'password',
            label: 'パスワード(必須)',
            placeholder: '',
            required: true,
          },
        ]}
      />
    </AmplifyAuthenticator>
  );
};

export default AccountPage;
