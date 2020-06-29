import React from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignOut,
} from '@aws-amplify/ui-react';

const IndexPage: React.FC = () => {
  return (
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
      <div>
        Kimono APP
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
};

export default IndexPage;
