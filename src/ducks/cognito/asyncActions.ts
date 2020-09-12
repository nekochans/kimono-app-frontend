import { createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import { CreateAccountRequest } from '../../domain/Cognito';
import AccountAlreadyExistsError from '../../domain/error/AccountAlreadyExistsError';
import CreateAccountUnexpectedError from '../../domain/error/CreateAccountUnexpectedError';

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
