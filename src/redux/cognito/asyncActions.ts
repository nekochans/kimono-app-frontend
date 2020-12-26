import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import {
  CreateAccountRequest,
  ResendCreateAccountRequest,
  LoginRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
} from '../../domain/cognito/request';
import AccountAlreadyExistsError from '../../domain/error/AccountAlreadyExistsError';
import CreateAccountUnexpectedError from '../../domain/error/CreateAccountUnexpectedError';
import ResendCreateAccountRequestUnexpectedError from '../../domain/error/ResendCreateAccountRequestUnexpectedError';
import NotConfirmedError from '../../domain/error/NotConfirmedError';
import LoginUnexpectedError from '../../domain/error/LoginUnexpectedError';
import PasswordAttemptsExceededError from '../../domain/error/PasswordAttemptsExceededError';
import WrongCredentialsError from '../../domain/error/WrongCredentialsError';
import PasswordResetRequestError from '../../domain/error/PasswordResetRequestError';
import PasswordResetConfirmError from '../../domain/error/PasswordResetConfirmError';
import { AmplifyError } from '../../domain/error/AmplifyError';

export const createAccountRequest = createAsyncThunk<
  void,
  CreateAccountRequest
>(
  'cognito/createAccountRequest',
  async (arg: CreateAccountRequest): Promise<void> => {
    try {
      await Auth.signUp({
        username: arg.email,
        password: arg.password,
      });
    } catch (e) {
      if (!('code' in e) || !('message' in e)) {
        throw new CreateAccountUnexpectedError(
          '予期せぬエラーが発生しました。',
          e,
        );
      }

      const amplifyError = e as AmplifyError;

      if (amplifyError.code === 'UsernameExistsException') {
        throw new AccountAlreadyExistsError(amplifyError.message, amplifyError);
      }

      // TODO バリデーション用の専用エラーを作ったほうが良さそう
      throw new CreateAccountUnexpectedError(
        amplifyError.message,
        amplifyError,
      );
    }
  },
);

export const resendCreateAccountRequest = createAsyncThunk<
  void,
  ResendCreateAccountRequest
>(
  'cognito/resendCreateAccountRequest',
  async (arg: ResendCreateAccountRequest): Promise<void> => {
    try {
      await Auth.resendSignUp(arg.email);
    } catch (e) {
      if (!('code' in e) || !('message' in e)) {
        throw new ResendCreateAccountRequestUnexpectedError(
          '予期せぬエラーが発生しました。',
          e,
        );
      }

      const amplifyError = e as AmplifyError;

      throw new ResendCreateAccountRequestUnexpectedError(
        amplifyError.message,
        amplifyError,
      );
    }
  },
);

export const loginRequest = createAsyncThunk<void, LoginRequest>(
  'cognito/loginRequest',
  async (arg: LoginRequest): Promise<void> => {
    try {
      await Auth.signIn(arg.email, arg.password);
    } catch (e) {
      if (!('code' in e) || !('message' in e)) {
        throw new LoginUnexpectedError('予期せぬエラーが発生しました。', e);
      }

      const amplifyError = e as AmplifyError;

      if (amplifyError.code === 'UserNotConfirmedException') {
        throw new NotConfirmedError(amplifyError.message, amplifyError);
      }

      if (
        amplifyError.code === 'NotAuthorizedException' &&
        amplifyError.message === 'Password attempts exceeded'
      ) {
        throw new PasswordAttemptsExceededError(
          amplifyError.message,
          amplifyError,
        );
      }

      if (amplifyError.code === 'NotAuthorizedException') {
        throw new WrongCredentialsError(amplifyError.message, amplifyError);
      }

      throw new LoginUnexpectedError(amplifyError.message, amplifyError);
    }
  },
);

export const passwordResetRequest = createAsyncThunk<
  void,
  PasswordResetRequest
>('cognito/passwordResetRequest', async (arg: PasswordResetRequest) => {
  try {
    await Auth.forgotPassword(arg.email);
  } catch (e) {
    if (!('code' in e) || !('message' in e)) {
      throw new PasswordResetRequestError('予期せぬエラーが発生しました。', e);
    }

    const amplifyError = e as AmplifyError;

    throw new PasswordResetRequestError(amplifyError.message, amplifyError);
  }
});

export const passwordResetConfirmRequest = createAsyncThunk<
  void,
  PasswordResetConfirmRequest
>(
  'cognito/passwordResetConfirmRequest',
  async (arg: PasswordResetConfirmRequest) => {
    try {
      await Auth.forgotPasswordSubmit(
        arg.cognitoUserName,
        arg.confirmationCode,
        arg.newPassword,
      );
    } catch (e) {
      if (!('code' in e) || !('message' in e)) {
        throw new PasswordResetConfirmError(
          '予期せぬエラーが発生しました。',
          e,
        );
      }

      const amplifyError = e as AmplifyError;

      throw new PasswordResetConfirmError(amplifyError.message, amplifyError);
    }
  },
);
