import { useReducer } from 'react';

interface Action {
  type: string;
}

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

export const useUpDown = (): [
  number: number,
  onIncrease: () => void,
  onDecrease: () => void
] => {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease: () => void = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const onDecrease: () => void = () => {
    dispatch({ type: 'DECREMENT' });
  };
  return [number, onIncrease, onDecrease];
};
