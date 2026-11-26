import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLanding } from '../landingSlice';
import { TELEGRAM_BOT_URL } from '../../../shared/config';
import SectionTitle from './SectionTitle';

function useCountdown(iso) {
  const calc = () => Math.max(0, Math.floor((new Date(iso) - Date.now()) / 1000));
  const [s, setS] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setS(calc()), 1000);
    return () => clearInterval(t);
  }, [iso]);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function MatchCard({ m }) {
  const time = useCountdown(m.startsAt);
  return (
    <article className="hud flex flex-col border border-line bg-panel transition hover:border-accent">
      <div className="flex items-center justify-between bg-ink px-5 py-2 text-bg">
        <span className="font-display text-xl uppercase tracking-wider">{m.game}</span>
        <span className="font-display text-lg uppercase">{m.mode}</span>
      </div>
      <div className="p-5">
        <h3 className="text-3xl font-semibold leading-tight text-ink">{m.title}</h3>
        <p className="mt-5 text-sm text-mute">Prize pool</p>
        <p className="font-display text-6xl font-bold leading-none text-gold">₹{m.prize.toLocaleString('en-IN')}</p>
        <div className="mt-5 grid grid-cols-3 border-y border-line py-3 text-center">
          <div><p className="text-xs text-mute">Starts in</p><p className="font-display text-2xl font-semibold tabular-nums text-accent">{time}</p></div>
          <div><p className="text-xs text-mute">Entry</p><p className="font-display text-2xl font-semibold text-ink">₹{m.entry}</p></div>
          <div><p className="text-xs text-mute">Slots</p><p className="font-display text-2xl font-semibold text-ink">{m.slots}</p></div>
        </div>
        <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer"
           className="cut mt-5 block bg-accent py-2 text-center font-display text-2xl font-semibold uppercase tracking-wider text-white transition hover:brightness-110">
          Join match
        </a>
      </div>
    </article>
  );
}

export default function MatchesSection() {
  const { matches } = useSelector(selectLanding);
  return (
    <section id="matches" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24">
      <SectionTitle sub="Grab a slot before the lobby fills up.">Upcoming matches</SectionTitle>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {matches.map((m) => <MatchCard key={m.id} m={m} />)}
      </div>
    </section>
  );
}
