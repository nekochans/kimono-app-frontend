import { Store, combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterSlice, { initialState as counterState } from './counter/slice';
import accountSlice, { initialState as accountState } from './account/slice';
import cognitoSlice, { initialState as cognitoState } from './cognito/slice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  account: accountSlice.reducer,
  cognito: cognitoSlice.reducer,
});

const preloadedState = () => {
  return {
    counter: counterState,
    account: accountState,
    cognito: cognitoState,
  };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStoreInstance = Store<StoreState>;

const createStore = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default createStore;
