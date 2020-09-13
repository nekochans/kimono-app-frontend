import { createSlice } from '@reduxjs/toolkit';
import {
  createAccountRequest,
  resendCreateAccountRequest,
} from './asyncActions';
import {
  CreateAccountRequest,
  ResendCreateAccountRequest,
} from '../../domain/Cognito';

export type CognitoState = {
  error: boolean;
  errorName: string;
  errorMessage: string;
  loading: boolean;
  successfulAccountCreateRequest: boolean;
  successfulResendAccountCreateRequest: boolean;
  sentEmail: string;
};

export const initialState: CognitoState = {
  error: false,
  errorName: '',
  errorMessage: '',
  loading: false,
  successfulAccountCreateRequest: false,
  successfulResendAccountCreateRequest: false,
  sentEmail: '',
};

const cognitoSlice = createSlice({
  name: 'cognito',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAccountRequest.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: false,
        errorName: '',
        errorMessage: '',
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        sentEmail: '',
      };
    });
    builder.addCase(
      createAccountRequest.rejected,
      (state, action: RejectedAction<CreateAccountRequest>) => {
        return {
          ...state,
          loading: false,
          error: true,
          errorName: action.error.name,
          errorMessage: action.error.message,
          successfulAccountCreateRequest: false,
          successfulResendAccountCreateRequest: false,
          sentEmail: '',
        };
      },
    );
    builder.addCase(createAccountRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        error: false,
        errorName: '',
        errorMessage: '',
        successfulAccountCreateRequest: true,
        successfulResendAccountCreateRequest: false,
        sentEmail: action.meta.arg.email,
      };
    });
    builder.addCase(resendCreateAccountRequest.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        sentEmail: '',
      };
    });
    builder.addCase(
      resendCreateAccountRequest.rejected,
      (state, action: RejectedAction<ResendCreateAccountRequest>) => {
        return {
          ...state,
          loading: false,
          error: true,
          errorName: action.error.name,
          errorMessage: action.error.message,
          successfulAccountCreateRequest: false,
          successfulResendAccountCreateRequest: false,
          sentEmail: '',
        };
      },
    );
    builder.addCase(resendCreateAccountRequest.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: true,
        sentEmail: action.meta.arg.email,
      };
    });
  },
});

export default cognitoSlice;
