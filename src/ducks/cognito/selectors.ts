import { useSelector } from 'react-redux';
import { CognitoState } from './slice';

export const useCognitoState = () => {
  return useSelector((state: { cognito: CognitoState }) => state.cognito);
};
