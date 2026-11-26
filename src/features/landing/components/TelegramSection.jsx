import { TELEGRAM_BOT_URL } from '../../../shared/config';

const steps = ['Start the bot', 'Add money with UPI', 'Join a match, get the room ID', 'Win and withdraw'];

export default function TelegramSection() {
  return (
    <section id="telegram" className="mx-auto max-w-7xl scroll-mt-20 px-5 pb-24">
      <div className="stripes grid gap-10 bg-accent p-8 text-white sm:p-14 lg:grid-cols-2">
        <div>
          <h2 className="text-6xl font-bold leading-[0.85] sm:text-8xl">Play every match from Telegram</h2>
          <p className="mt-5 max-w-md text-lg text-white/90">No app to install. Join matches, get room details, check results and withdraw winnings in one chat.</p>
          <ol className="mt-6 space-y-2">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 font-display text-2xl uppercase tracking-wide">
                <span className="grid h-8 w-8 -skew-x-12 place-items-center bg-white text-xl text-accent">{i + 1}</span>{s}
              </li>
            ))}
          </ol>
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer"
             className="cut mt-8 inline-block bg-white px-9 py-3 font-display text-2xl font-semibold uppercase tracking-wider text-accent transition hover:-translate-y-0.5">
            Start the bot
          </a>
        </div>

        {/* Chat preview */}
        <div className="mx-auto w-full max-w-sm self-center border-2 border-ink bg-panel text-ink shadow-[10px_10px_0_var(--ink)]">
          <p className="bg-ink px-4 py-3 font-display text-xl uppercase tracking-wider text-bg">ArenaX bot</p>
          <div className="space-y-3 p-4 text-sm">
            <p className="ml-auto w-fit bg-accent px-3 py-2 text-white">/join BGMI Squad ₹50</p>
            <p className="w-fit max-w-[85%] border border-line bg-bg px-3 py-2">Slot booked. ₹50 deducted. Room ID drops 10 min before start.</p>
            <p className="w-fit max-w-[85%] border border-line bg-bg px-3 py-2">Room ID: <b>48291</b>, Password: <b>GG77</b>. Good luck!</p>
            <p className="w-fit max-w-[85%] border border-line bg-bg px-3 py-2">You placed #1. <b className="text-gold">₹2,500</b> added to your wallet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
