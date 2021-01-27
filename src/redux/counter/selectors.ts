import { useSelector } from 'react-redux';
import { CounterState } from './slice';

// eslint-disable-next-line import/prefer-default-export
export const useCounterState = (): CounterState =>
  useSelector((state: { counter: CounterState }) => state.counter);
