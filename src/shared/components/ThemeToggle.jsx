import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from '../../features/theme/themeSlice';

export default function ThemeToggle() {
  const mode = useSelector(selectTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    try { localStorage.setItem('theme', mode); } catch {}
  }, [mode]);

  const dark = mode === 'dark';
  return (
    <button onClick={() => dispatch(toggleTheme())} aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            className="grid h-10 w-10 place-items-center border border-line text-ink transition hover:border-accent hover:text-accent">
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
      )}
    </button>
  );
}
