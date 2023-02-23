import {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
  useRef,
} from 'react';

interface HiProps {
  confirmValue: () => void;
  confirmValue2: () => void;
}

const Input = forwardRef<HiProps, InputHTMLAttributes<HTMLInputElement>>(
  function CustomInput({ value = 'sample', ...props }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    useImperativeHandle(
      ref,
      () => ({
        confirmValue: () => confirm(inputRef.current?.value),
        confirmValue2: () => confirm(inputRef2.current?.value),
      }),
      []
    );
    return (
      <div>
        <input type='text' {...props} ref={inputRef} />
        <input type='text' {...props} ref={inputRef2} />
      </div>
    );
  }
);

export default function Sample() {
  const inputRef = useRef<HiProps>(null);
  return (
    <div>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current?.confirmValue()}>1번</button>
      <button onClick={() => inputRef.current?.confirmValue2()}>2번</button>
    </div>
  );
}
