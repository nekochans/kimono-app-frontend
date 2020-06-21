import React from 'react';
import { useDispatch } from 'react-redux';
import counterSlice from '../ducks/counter/slice';
import { useCounterState } from '../ducks/counter/selectors';
import { asyncIncrementCounter } from '../ducks/counter/asyncActions';

type ErrorMessageProps = {
  message: string;
};

const StyledErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
}: ErrorMessageProps) => {
  return (
    <>
      <style jsx>{`
        p {
          color: red;
          font-weight: bold;
        }
      `}</style>
      <p>問題が発生しました。 {message}</p>
    </>
  );
};

const CounterPage: React.FC = () => {
  const dispatch = useDispatch();
  const state = useCounterState().counter;

  const onClickIncrement = () => {
    dispatch(counterSlice.actions.incrementCounter(1));
  };

  const onClickDecrement = () => {
    dispatch(counterSlice.actions.decrementCounter(1));
  };

  const onClickAsyncIncrement = async () => {
    await dispatch(asyncIncrementCounter(10));
  };

  return (
    <>
      <button type="button" onClick={onClickIncrement}>
        ふやす
      </button>
      <button type="button" onClick={onClickDecrement}>
        へらす
      </button>
      <button
        type="button"
        onClick={onClickAsyncIncrement}
        disabled={state.loading}
      >
        非同期でふやす
      </button>
      <p>ねこが{useCounterState().counter.count} 匹いる</p>
      {state.loading ? <p>通信中</p> : ''}
      {state.error ? (
        <StyledErrorMessage {...{ message: state.errorMessage }} />
      ) : (
        ''
      )}
    </>
  );
};

export default CounterPage;
