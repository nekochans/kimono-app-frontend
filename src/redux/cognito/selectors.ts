import { useSelector } from 'react-redux';
import { CognitoState } from './slice';

export const useCognitoState = (): CognitoState =>
  useSelector((state: { cognito: CognitoState }) => state.cognito);
