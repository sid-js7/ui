import { Link } from 'react-router-dom';
import { APP_NAME, TELEGRAM_BOT_URL } from '../../../shared/config';

const legal = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms and Conditions', '/terms-and-conditions'],
  ['Fair Play Policy', '/fair-play-policy'],
  ['Refund and Cancellation', '/refund-and-cancellation'],
  ['Contact Us', '/contact-us'],
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-accent bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl font-bold uppercase tracking-wider text-ink">{APP_NAME}</p>
          <p className="mt-3 max-w-xs text-sm text-mute">Skill-based esports tournaments for BGMI, Free Fire and the games coming next.</p>
        </div>
        <div>
          <p className="font-display text-2xl uppercase text-accent">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            {legal.map(([l, to]) => <li key={to}><Link to={to} className="text-mute hover:text-accent">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="font-display text-2xl uppercase text-accent">Play</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer" className="text-mute hover:text-accent">Telegram bot</a></li>
            <li><a href="/#matches" className="text-mute hover:text-accent">Upcoming matches</a></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-5 py-5 text-center text-xs text-mute">
        © {new Date().getFullYear()} {APP_NAME}. Participation involves financial risk. 18+ only. Play responsibly.
      </p>
    </footer>
  );
}
