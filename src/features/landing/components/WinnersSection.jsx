import { useSelector } from 'react-redux';
import { selectLanding } from '../landingSlice';
import SectionTitle from './SectionTitle';

export default function WinnersSection() {
  const { winners } = useSelector(selectLanding);
  const loop = [...winners, ...winners];
  return (
    <section id="winners" className="scroll-mt-20 border-y border-line bg-panel py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle sub="Real winners, paid out after every match.">Recent payouts</SectionTitle>
      </div>
      <div className="mt-12 overflow-hidden">
        <ul className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {loop.map((w, i) => (
            <li key={`${w.id}-${i}`} className="hud w-72 shrink-0 border border-line bg-bg p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-2xl uppercase tracking-wide text-ink">{w.player}</p>
                <span className="bg-accent px-2 font-display text-lg uppercase text-white">Paid</span>
              </div>
              <p className="mt-4 font-display text-6xl font-bold leading-none text-gold">₹{w.amount.toLocaleString('en-IN')}</p>
              <p className="mt-2 text-sm text-mute">{w.game}, {w.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
