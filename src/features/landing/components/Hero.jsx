import { useSelector } from 'react-redux';
import { selectLanding } from '../landingSlice';
import { TELEGRAM_BOT_URL } from '../../../shared/config';

// Broadcast-style scoreboard. Wire to a live-tournament endpoint later.
const board = [
  { team: 'TEAM SOUL', kills: 18, pts: 42 },
  { team: 'GODLIKE', kills: 15, pts: 37 },
  { team: 'ORANGE ROCK', kills: 11, pts: 31 },
  { team: 'NIGHT WOLVES', kills: 9, pts: 26 },
  { team: 'RUDRA SQUAD', kills: 7, pts: 22 },
];
const ticker = ['BGMI tournaments', 'Free Fire clash', 'Daily cash payouts', 'Anti-cheat monitored', 'Join from Telegram', 'New games soon'];

export default function Hero() {
  const { stats } = useSelector(selectLanding);
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Red diagonal slab behind the scoreboard */}
        <div className="stripes absolute inset-y-0 right-0 hidden w-[52%] bg-accent [clip-path:polygon(24%_0,100%_0,100%_100%,0_100%)] lg:block" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <div className="animate-slide">
            <h1 className="text-[5.5rem] font-bold leading-[0.8] text-ink sm:text-[8rem] lg:text-[9.5rem]">
              Compete.<br />
              <span className="text-accent">Dominate.</span><br />
              Get paid.
            </h1>
            <p className="mt-8 max-w-lg text-lg text-mute">
              The esports tournament platform for BGMI and Free Fire. Squad up, win real cash prizes and run your whole match day from Telegram.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer"
                 className="cut bg-accent px-9 py-3 font-display text-2xl font-semibold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:brightness-110">
                Play on Telegram
              </a>
              <a href="#matches" className="cut border-2 border-ink px-9 py-3 font-display text-2xl font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-bg">
                Upcoming matches
              </a>
            </div>
          </div>

          <div className="hud mx-auto w-full max-w-md border border-line bg-panel shadow-[10px_10px_0_var(--ink)]">
            <div className="flex items-center justify-between bg-ink px-5 py-3 text-bg">
              <p className="font-display text-2xl font-semibold uppercase tracking-wider">Grand Finals</p>
              <p className="flex items-center gap-2 font-display text-lg uppercase text-accent">
                <span className="h-2.5 w-2.5 animate-blink rounded-full bg-accent" /> Live
              </p>
            </div>
            <ol>
              {board.map((r, i) => (
                <li key={r.team} className="relative flex items-center gap-4 border-b border-line px-5 py-3">
                  <div className="absolute inset-y-0 left-0 origin-left animate-grow bg-accent/10"
                       style={{ width: `${r.pts * 2.2}%`, animationDelay: `${0.4 + i * 0.12}s` }} />
                  <span className={`relative w-8 font-display text-3xl font-bold ${i === 0 ? 'text-gold' : 'text-mute'}`}>{i + 1}</span>
                  <span className="relative flex-1 font-display text-2xl uppercase tracking-wide text-ink">{r.team}</span>
                  <span className="relative text-sm text-mute">{r.kills} kills</span>
                  <span className="relative w-10 text-right font-display text-3xl font-bold text-accent">{r.pts}</span>
                </li>
              ))}
            </ol>
            <p className="px-5 py-3 text-sm text-mute">Prize pool <span className="font-display text-2xl font-bold text-gold">₹10,000</span></p>
          </div>
        </div>

        <dl className="relative mx-auto grid max-w-7xl grid-cols-3 border-y border-line bg-bg/80 px-5 backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="border-r border-line px-4 py-5 last:border-0 sm:px-8">
              <dd className="font-display text-4xl font-bold text-ink sm:text-5xl">{s.value}</dd>
              <dt className="text-xs text-mute sm:text-sm">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <div className="overflow-hidden bg-ink py-3 text-bg">
        <ul className="flex w-max animate-marquee gap-10">
          {[...ticker, ...ticker].map((t, i) => (
            <li key={i} className="flex items-center gap-10 font-display text-2xl uppercase tracking-wider">
              {t}<span className="h-3 w-3 rotate-45 bg-accent" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
