import { useSelector } from 'react-redux';
import { CognitoState } from './slice';

export const useCognitoState = (): CognitoState => {
  return useSelector((state: { cognito: CognitoState }) => state.cognito);
};
