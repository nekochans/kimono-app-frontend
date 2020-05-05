import { createAsyncThunk } from '@reduxjs/toolkit';

const sleep = (microSecond: number) =>
  new Promise((resolve) => setTimeout(resolve, microSecond));

export const asyncIncrementCounter = createAsyncThunk<number, number>(
  'counter/asyncIncrementCounter',
  async (arg: number): Promise<number> => {
    await sleep(1000);

    return arg;
  },
);
