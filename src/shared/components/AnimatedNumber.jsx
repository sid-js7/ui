import { useCountUp } from '../hooks/useCountUp';

// `value` is in display units (rupees, not paisa): pass toRupees(paisa).
export default function AnimatedNumber({ value, prefix = '', decimals = 0, className = '' }) {
  const v = useCountUp(value);
  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
