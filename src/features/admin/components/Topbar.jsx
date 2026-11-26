import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThemeToggle from '../../../shared/components/ThemeToggle';
import NotificationBell from './NotificationBell';
import { logout, selectUser } from '../../auth/authSlice';

export default function Topbar({ onMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const out = async () => { await dispatch(logout()); navigate('/admin/login', { replace: true }); };
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-bg px-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} aria-label="Open menu" className="grid h-10 w-10 place-items-center border border-line lg:hidden">
          <span className="block h-0.5 w-5 bg-ink shadow-[0_6px_0_var(--ink),0_-6px_0_var(--ink)]" />
        </button>
        <div>
          <h1 className="font-display text-3xl font-bold uppercase leading-none text-ink">Dashboard</h1>
          <p className="hidden text-xs text-mute sm:block">{today}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationBell />
        <div className="hidden items-center gap-3 border-l border-line pl-3 sm:flex">
          <span className="grid h-10 w-10 -skew-x-6 place-items-center bg-accent font-display text-xl font-bold text-white">{(user?.email || 'A')[0].toUpperCase()}</span>
          <div className="leading-tight">
            <p className="max-w-40 truncate text-sm font-semibold text-ink">{user?.name || user?.email || 'Admin'}</p>
            <button onClick={out} className="text-xs text-mute hover:text-accent">Log out</button>
          </div>
        </div>
        <button onClick={out} className="text-sm text-mute hover:text-accent sm:hidden">Log out</button>
      </div>
    </header>
  );
}
