import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import {
  CreateAccountRequest,
  ResendCreateAccountRequest,
} from '../../domain/Cognito';
import AccountAlreadyExistsError from '../../domain/error/AccountAlreadyExistsError';
import CreateAccountUnexpectedError from '../../domain/error/CreateAccountUnexpectedError';
import ResendCreateAccountRequestUnexpectedError from '../../domain/error/ResendCreateAccountRequestUnexpectedError';

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
