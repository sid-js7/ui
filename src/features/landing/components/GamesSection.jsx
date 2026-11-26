import { useSelector } from 'react-redux';
import { selectLanding } from '../landingSlice';
import SectionTitle from './SectionTitle';

export default function GamesSection() {
  const { games } = useSelector(selectLanding);
  return (
    <section id="games" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24">
      <SectionTitle sub="Every game has its own rooms, prize pools and rules. More titles are on the way.">Choose your game</SectionTitle>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {games.map((g) => {
          const live = g.status === 'live';
          return (
            <article key={g.id} className={`hud group relative flex h-80 flex-col justify-between overflow-hidden border p-6 transition hover:-translate-y-1 ${live ? 'border-transparent text-white' : 'border-dashed border-line bg-panel text-ink'}`}
                     style={live ? { background: g.from } : undefined}>
              {live && <div className="stripes absolute inset-0" />}
              <span className={`relative w-fit px-3 py-1 font-display text-lg uppercase ${live ? 'bg-black/40' : 'bg-accent text-white'}`}>
                {live ? 'Tournaments live' : 'Coming soon'}
              </span>
              <div className="relative">
                <h3 className={`text-8xl font-bold leading-[0.8] ${live ? '' : 'outline-text'}`}>{g.name}</h3>
                <p className={`mt-3 text-sm ${live ? 'text-white/85' : 'text-mute'}`}>{g.genre}. Modes: {g.modes}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
