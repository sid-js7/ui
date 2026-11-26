import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { markAllRead, selectNotifications } from '../../notifications/notificationsSlice';
import { timeAgo } from '../../../shared/utils/format';

const tone = { payment: 'bg-up', alert: 'bg-accent', system: 'bg-mute' };

export default function NotificationBell() {
  const dispatch = useDispatch();
  const items = useSelector(selectNotifications);
  const unread = items.filter((i) => !i.read).length;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} aria-label={`Notifications, ${unread} unread`} aria-expanded={open}
              className="relative grid h-10 w-10 place-items-center border border-line text-ink transition hover:border-accent hover:text-accent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" /></svg>
        {unread > 0 && <span key={unread} className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 animate-drop place-items-center bg-accent px-1 text-xs font-bold text-white">{unread > 99 ? '99+' : unread}</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-[22rem] max-w-[calc(100vw-2rem)] animate-drop border border-line bg-panel shadow-[6px_6px_0_var(--ink)]">
          <div className="flex items-center justify-between border-b border-line px-4 py-2">
            <p className="font-display text-xl uppercase tracking-wider text-ink">Notifications</p>
            <button onClick={() => dispatch(markAllRead())} disabled={!unread} className="text-xs text-mute hover:text-accent disabled:opacity-40">Mark all read</button>
          </div>
          <ul className="thin-scroll max-h-96 overflow-y-auto">
            {items.map((n) => (
              <li key={n.id} className={`flex gap-3 border-b border-line px-4 py-3 ${n.read ? '' : 'bg-accent/5'}`}>
                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rotate-45 ${tone[n.kind]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{n.title}</p>
                  <p className="text-sm text-mute">{n.text}</p>
                </div>
                <span className="shrink-0 text-xs text-mute">{timeAgo(n.time)}</span>
              </li>
            ))}
          </ul>
          <Link to="/admin/notifications" onClick={() => setOpen(false)} className="block px-4 py-3 text-center font-display text-lg uppercase tracking-wider text-accent hover:underline">View all notifications</Link>
        </div>
      )}
    </div>
  );
}
