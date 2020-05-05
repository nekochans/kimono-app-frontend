import { useSelector } from 'react-redux';
import { CounterState } from './slice';

export const useCounterState = () => {
  return useSelector((state: { counter: CounterState }) => state);
};
