import { useSelector } from 'react-redux';
import { CognitoState } from './slice';

// eslint-disable-next-line import/prefer-default-export
export const useCognitoState = (): CognitoState =>
  useSelector((state: { cognito: CognitoState }) => state.cognito);
