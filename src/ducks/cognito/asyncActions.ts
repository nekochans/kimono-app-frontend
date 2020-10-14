import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import {
  CreateAccountRequest,
  ResendCreateAccountRequest,
  LoginRequest,
} from '../../domain/Cognito';
import AccountAlreadyExistsError from '../../domain/error/AccountAlreadyExistsError';
import CreateAccountUnexpectedError from '../../domain/error/CreateAccountUnexpectedError';
import ResendCreateAccountRequestUnexpectedError from '../../domain/error/ResendCreateAccountRequestUnexpectedError';
import NotConfirmedError from '../../domain/error/NotConfirmedError';
import LoginUnexpectedError from '../../domain/error/LoginUnexpectedError';
import PasswordAttemptsExceeded from '../../domain/error/PasswordAttemptsExceeded';
import WrongCredentialsError from '../../domain/error/WrongCredentialsError';

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
      if (e.code === 'UsernameExistsException') {
        throw new AccountAlreadyExistsError(e.message, e);
      }

      throw new CreateAccountUnexpectedError(e.message, e);
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
      throw new ResendCreateAccountRequestUnexpectedError(e.message, e);
    }
  },
);

export const loginRequest = createAsyncThunk<void, LoginRequest>(
  'cognito/loginRequest',
  async (arg: LoginRequest): Promise<void> => {
    try {
      await Auth.signIn(arg.email, arg.password);
    } catch (e) {
      if (e.code === 'UserNotConfirmedException') {
        throw new NotConfirmedError(e.message, e);
      }

      if (
        e.code === 'NotAuthorizedException' &&
        e.message === 'Password attempts exceeded'
      ) {
        throw new PasswordAttemptsExceeded(e.message, e);
      }

      if (e.code === 'NotAuthorizedException') {
        throw new WrongCredentialsError(e.message, e);
      }

      throw new LoginUnexpectedError(e.message, e);
    }
  },
);
