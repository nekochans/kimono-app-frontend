import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import counterSlice, { initialState as counterState } from './counter/slice';
import cognitoSlice, { initialState as cognitoState } from './cognito/slice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  cognito: cognitoSlice.reducer,
});

const preloadedState = () => ({
  counter: counterState,
  cognito: cognitoState,
});

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStoreInstance = Store<StoreState>;

const createStore = (): EnhancedStore => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default createStore;
