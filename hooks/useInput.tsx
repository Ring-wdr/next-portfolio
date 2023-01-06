import React, { useCallback, useDeferredValue, useState } from 'react';

export const useInput = (
  input?: string
): [defferedState: string, onChange: (e: any) => void] => {
  const [state, setState] = useState(input || '');
  const defferedState = useDeferredValue(state);

  const onChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
    e && setState(e.target.value);
  }, []);

  return [defferedState, onChange];
};
