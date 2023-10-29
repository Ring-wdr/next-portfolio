import { useEffect, useRef, useState } from "react";

export const useInterObs = <T,>(options?: IntersectionObserverInit) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((e) => {
      e.forEach((entry) =>
        entry.isIntersecting ? setInView(true) : setInView(false)
      );
    }, options);
    io.observe(ref.current as Element);
  }, []);
  return { ref, inView };
};
