import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncIncrementCounter } from './asyncActions';

export type CounterState = {
  count: number;
  loading: boolean;
};

export const initialState: CounterState = {
  count: 0,
  loading: false,
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
      };
    });
    builder.addCase(
      asyncIncrementCounter.fulfilled,
      (state, action: PayloadAction<number>) => {
        return {
          ...state,
          count: state.count + action.payload,
          loading: false,
        };
      },
    );
  },
});

export default counterSlice;
