export interface ToggleReducerAction<T> {
  type: keyof T;
  payload?: boolean;
}

export const toggleReducer = <S>(
  state: S,
  action: ToggleReducerAction<S>
): S => ({
  ...state,
  [action.type]: action.payload ?? !state[action.type],
});
