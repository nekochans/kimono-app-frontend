import { useSelector } from 'react-redux';
import { CounterState } from './slice';

export const useCounterState = (): CounterState => {
  return useSelector((state: { counter: CounterState }) => state.counter);
};
