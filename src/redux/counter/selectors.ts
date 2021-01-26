import { useSelector } from 'react-redux';
import { CounterState } from './slice';

export const useCounterState = (): CounterState =>
  useSelector((state: { counter: CounterState }) => state.counter);
