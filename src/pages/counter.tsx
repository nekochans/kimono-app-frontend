import React from 'react';
import { useDispatch } from 'react-redux';
import counterSlice, { useCounterState } from '../ducks/counter/slice';

const CounterPage: React.FC = () => {
  const dispatch = useDispatch();

  const onClickIncrement = () => {
    dispatch(counterSlice.actions.incrementCounter(1));
  };

  const onClickDecrement = () => {
    dispatch(counterSlice.actions.decrementCounter(1));
  };

  return (
    <>
      <button type="button" onClick={onClickIncrement}>
        ふやす
      </button>
      <button type="button" onClick={onClickDecrement}>
        へらす
      </button>
      <p>ねこが{useCounterState().counter.count} 匹いる</p>
    </>
  );
};

export default CounterPage;
