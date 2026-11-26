import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import AnimatedNumber from '../../../shared/components/AnimatedNumber';
import { compactPaisa, formatPaisa, toRupees } from '../../../shared/utils/format';

export default function WalletCards() {
  const { wallets } = useSelector(selectDashboard);
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {wallets.map((w, i) => {
        const net = w.in - w.out;
        const good = (w.change >= 0) === (w.goodWhenUp !== false);
        return (
          <article key={w.id} title={formatPaisa(w.balance)} style={{ animationDelay: `${i * 80}ms` }}
                   className="hud animate-fade border border-line bg-panel p-4 last:col-span-2 md:last:col-span-1">
            <p className="font-display text-lg uppercase tracking-wide text-mute">{w.label}</p>
            <AnimatedNumber value={toRupees(w.balance)} prefix="₹" className="block font-display text-3xl font-bold leading-tight text-ink xl:text-4xl" />
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className={`font-semibold ${good ? 'text-up' : 'text-accent'}`}>{w.change >= 0 ? '▲' : '▼'} {Math.abs(w.change)}%</span>
              <span className="text-mute">Today {net >= 0 ? '+' : '-'}{compactPaisa(net)}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
