import { useEffect, useRef, useState } from 'react';

// Animates from the previous value to the new target (so live updates tick smoothly).
export function useCountUp(target, duration = 900) {
  const [val, setVal] = useState(0);
  const from = useRef(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { from.current = target; setVal(target); return; }
    const begin = from.current;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = begin + (target - begin) * (1 - Math.pow(1 - t, 3));
      from.current = v;
      setVal(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}
