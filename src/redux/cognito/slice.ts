import { createSlice } from '@reduxjs/toolkit';
import {
  createAccountRequest,
  loginRequest,
  passwordResetConfirmRequest,
  passwordResetRequest,
  resendCreateAccountRequest,
} from './asyncActions';
import {
  CreateAccountRequest,
  LoginRequest,
  PasswordResetConfirmRequest,
  PasswordResetRequest,
  ResendCreateAccountRequest,
} from '../../domain/cognito/request';

export type CognitoState = {
  error: boolean;
  errorName: string;
  errorMessage: string;
  loading: boolean;
  successfulAccountCreateRequest: boolean;
  successfulResendAccountCreateRequest: boolean;
  successfulLoginRequest: boolean;
  successfulPasswordResetRequest: boolean;
  successfulPasswordResetConfirm: boolean;
  sentEmail: string;
};

export const initialState: CognitoState = {
  error: false,
  errorName: '',
  errorMessage: '',
  loading: false,
  successfulAccountCreateRequest: false,
  successfulResendAccountCreateRequest: false,
  successfulLoginRequest: false,
  successfulPasswordResetRequest: false,
  successfulPasswordResetConfirm: false,
  sentEmail: '',
};

const cognitoSlice = createSlice({
  name: 'cognito',
  initialState,
  reducers: {
    loggedOut: (state) => ({
      ...state,
      loading: false,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(createAccountRequest.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }));
    builder.addCase(
      createAccountRequest.rejected,
      (state, action: RejectedAction<CreateAccountRequest>) => ({
        ...state,
        loading: false,
        error: true,
        errorName: action.error.name, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMessage: action.error.message, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        successfulLoginRequest: false,
        successfulPasswordResetRequest: false,
        successfulPasswordResetConfirm: false,
        sentEmail: '',
      }),
    );
    builder.addCase(createAccountRequest.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: true,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: action.meta.arg.email,
    }));
    builder.addCase(resendCreateAccountRequest.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }));
    builder.addCase(
      resendCreateAccountRequest.rejected,
      (state, action: RejectedAction<ResendCreateAccountRequest>) => ({
        ...state,
        loading: false,
        error: true,
        errorName: action.error.name, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMessage: action.error.message, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        successfulLoginRequest: false,
        successfulPasswordResetRequest: false,
        successfulPasswordResetConfirm: false,
        sentEmail: '',
      }),
    );
    builder.addCase(resendCreateAccountRequest.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: true,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: action.meta.arg.email,
    }));
    builder.addCase(loginRequest.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }));
    builder.addCase(
      loginRequest.rejected,
      (state, action: RejectedAction<LoginRequest>) => ({
        ...state,
        loading: false,
        error: false,
        errorName: action.error.name, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMessage: action.error.message, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        successfulLoginRequest: false,
        successfulPasswordResetRequest: false,
        successfulPasswordResetConfirm: false,
        sentEmail: '',
      }),
    );
    builder.addCase(loginRequest.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: true,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }));
    builder.addCase(passwordResetRequest.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }));
    builder.addCase(
      passwordResetRequest.rejected,
      (state, action: RejectedAction<PasswordResetRequest>) => ({
        ...state,
        loading: false,
        error: true,
        errorName: action.error.name, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMessage: action.error.message, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        successfulLoginRequest: false,
        successfulPasswordResetRequest: false,
        successfulPasswordResetConfirm: false,
        sentEmail: '',
      }),
    );
    builder.addCase(passwordResetRequest.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: true,
      successfulPasswordResetConfirm: false,
      sentEmail: action.meta.arg.email,
    }));
    builder.addCase(passwordResetConfirmRequest.pending, (state) => ({
      ...state,
      loading: true,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: false,
      sentEmail: '',
    }));
    builder.addCase(
      passwordResetConfirmRequest.rejected,
      (state, action: RejectedAction<PasswordResetConfirmRequest>) => ({
        ...state,
        loading: false,
        error: true,
        errorName: action.error.name, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        errorMessage: action.error.message, // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        successfulAccountCreateRequest: false,
        successfulResendAccountCreateRequest: false,
        successfulLoginRequest: false,
        successfulPasswordResetRequest: false,
        successfulPasswordResetConfirm: false,
        sentEmail: '',
      }),
    );
    builder.addCase(passwordResetConfirmRequest.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: false,
      errorName: '',
      errorMessage: '',
      successfulAccountCreateRequest: false,
      successfulResendAccountCreateRequest: false,
      successfulLoginRequest: false,
      successfulPasswordResetRequest: false,
      successfulPasswordResetConfirm: true,
      sentEmail: '',
    }));
  },
});

export default cognitoSlice;
