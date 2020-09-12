import { createSlice } from '@reduxjs/toolkit';
import { createAccountRequest } from './asyncActions';
import { CreateAccountRequest } from '../../domain/Cognito';

export type CognitoState = {
  error: boolean;
  errorName: string;
  errorMessage: string;
  loading: boolean;
  successfulAccountCreateRequest: boolean;
};

export const initialState: CognitoState = {
  error: false,
  errorName: '',
  errorMessage: '',
  loading: false,
  successfulAccountCreateRequest: false,
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
        };
      },
    );
    builder.addCase(createAccountRequest.fulfilled, (state) => {
      return {
        ...state,
        loading: false,
        error: false,
        errorName: '',
        errorMessage: '',
        successfulAccountCreateRequest: true,
      };
    });
  },
});

export default cognitoSlice;
