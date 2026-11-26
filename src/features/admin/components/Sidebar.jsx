import { Link, NavLink } from 'react-router-dom';
import { APP_NAME } from '../../../shared/config';

const items = [
  ['Dashboard', '/admin', true], ['Tournaments', '/admin/tournaments'], ['Players', '/admin/players'],
  ['Payments', '/admin/payments'], ['Withdrawals', '/admin/withdrawals'], ['Wallets', '/admin/wallets'],
  ['Reports', '/admin/reports'], ['Settings', '/admin/settings'],
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-60 shrink-0 flex-col border-r border-line bg-panel transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link to="/" className="flex h-16 items-center gap-2 border-b border-line px-5 font-display text-3xl font-bold uppercase tracking-wider text-ink">
          <span className="grid h-8 w-8 -skew-x-12 place-items-center bg-accent text-xl text-white">A</span>{APP_NAME}
        </Link>
        <nav className="thin-scroll flex-1 overflow-y-auto py-4">
          {items.map(([label, to, end]) => (
            <NavLink key={to} to={to} end={end} onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 border-l-4 px-5 py-2.5 font-display text-xl uppercase tracking-wider transition ${isActive ? 'border-accent bg-accent/10 text-ink' : 'border-transparent text-mute hover:text-accent'}`}>
              <span className="h-2 w-2 rotate-45 bg-current" />{label}
            </NavLink>
          ))}
        </nav>
        <p className="flex items-center gap-2 border-t border-line px-5 py-4 text-xs text-mute">
          <span className="h-2 w-2 animate-blink rounded-full bg-up" /> All systems operational
        </p>
      </aside>
    </>
  );
}
