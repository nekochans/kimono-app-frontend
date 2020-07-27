import { useSelector } from 'react-redux';
import { AccountState } from './slice';

export const useAccountState = () => {
  return useSelector((state: { account: AccountState }) => state);
};
