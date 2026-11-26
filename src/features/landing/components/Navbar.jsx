import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, TELEGRAM_BOT_URL } from '../../../shared/config';
import ThemeToggle from '../../../shared/components/ThemeToggle';

const links = [['Games', '/#games'], ['Matches', '/#matches'], ['Winners', '/#winners'], ['Telegram', '/#telegram']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 font-display text-3xl font-bold uppercase tracking-wider text-ink">
          <span className="grid h-8 w-8 -skew-x-12 place-items-center bg-accent text-xl text-white">A</span>
          {APP_NAME}
        </Link>
        <ul className="hidden gap-9 md:flex">
          {links.map(([l, h]) => (
            <li key={l}><a href={h} className="font-display text-xl uppercase tracking-wider text-mute transition hover:text-accent">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer"
             className="cut hidden bg-accent px-6 py-2 font-display text-xl font-semibold uppercase tracking-wider text-white transition hover:brightness-110 sm:block">
            Play now
          </a>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}
                  className="grid h-10 w-10 place-items-center border border-line md:hidden">
            <span className="block h-0.5 w-5 bg-ink shadow-[0_6px_0_var(--ink),0_-6px_0_var(--ink)]" />
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-line bg-panel px-5 py-3 md:hidden">
          {links.map(([l, h]) => (
            <li key={l}><a href={h} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl uppercase text-ink">{l}</a></li>
          ))}
        </ul>
      )}
    </header>
  );
}
