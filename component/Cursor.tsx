import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const cursor = (
  e: MouseEvent,
  setX: Dispatch<SetStateAction<string>>,
  setY: Dispatch<SetStateAction<string>>
) => {
  setX(`${e.pageX}px`);
  setY(`${e.pageY}px`);
};

export const Cursor = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  useEffect(() => {
    window.addEventListener('mousemove', (e) => cursor(e, setX, setY));
    return () =>
      window.removeEventListener('mousemove', (e) => cursor(e, setX, setY));
  }, []);
  return (
    <div className='cursor-emoji'>
      <style jsx>{`
        .cursor {
          position: absolute;
          left: ${x};
          top: ${y};
          background: rgb(0, 234, 255, 0.5);
          border: black 2px solid;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
          z-index: 50;
        }
        .cursor-emoji {
          cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🤖</text></svg>")
              16 0,
            auto;
        }
      `}</style>
    </div>
  );
};
