import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AccountState = {
  name: string;
  authState: string;
  error: boolean;
  errorMessage: string;
};

export const initialState: AccountState = {
  name: '',
  authState: '',
  error: false,
  errorMessage: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => ({
      ...state,
      name: action.payload,
    }),
    setAuthState: (state, action: PayloadAction<string>) => ({
      ...state,
      authState: action.payload,
    }),
  },
});

export default accountSlice;
