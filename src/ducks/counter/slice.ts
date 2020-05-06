import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncIncrementCounter } from './asyncActions';

export type CounterState = {
  count: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const initialState: CounterState = {
  count: 0,
  loading: false,
  error: false,
  errorMessage: '',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decrementCounter: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count - action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(asyncIncrementCounter.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
      };
    });
    builder.addCase(
      asyncIncrementCounter.rejected,
      (state, action: RejectedAction<number>) => {
        return {
          ...state,
          loading: false,
          error: true,
          errorMessage: action.error.message,
        };
      },
    );
    builder.addCase(
      asyncIncrementCounter.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          count: state.count + action.payload,
          loading: false,
          error: false,
          errorMessage: '',
        };
      },
    );
  },
});

export default counterSlice;
