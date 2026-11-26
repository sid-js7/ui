import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import Panel from './Panel';
import { formatPaisa } from '../../../shared/utils/format';

const kinds = {
  deposit: { tag: 'DEP', label: 'Deposit', sign: '+' },
  withdrawal: { tag: 'WDL', label: 'Withdrawal', sign: '-' },
  entry_fee: { tag: 'FEE', label: 'Entry fee', sign: '+' },
  payout: { tag: 'WIN', label: 'Prize payout', sign: '-' },
};

export default function LivePayments() {
  const { livePayments } = useSelector(selectDashboard);
  const live = (
    <span className="flex items-center gap-2 font-display text-lg uppercase text-accent">
      <span className="h-2.5 w-2.5 animate-blink rounded-full bg-accent" />Live
    </span>
  );
  return (
    <Panel title="Live payments" right={live} className="lg:col-span-4" delay={660}>
      <ul className="-my-1">
        {livePayments.map((p) => {
          const k = kinds[p.type];
          return (
            <li key={p.id} className="flex animate-drop items-center gap-3 border-b border-line py-2.5 last:border-0">
              <span className="grid h-9 w-11 shrink-0 -skew-x-6 place-items-center bg-ink font-display text-lg font-semibold text-bg">{k.tag}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">{p.user}</p>
                <p className="text-xs text-mute">{k.label}, {p.method}, {new Date(p.time).toLocaleTimeString('en-IN')}</p>
              </div>
              <div className="text-right">
                <p className={`font-display text-xl font-semibold ${p.status === 'failed' ? 'text-mute line-through' : k.sign === '+' ? 'text-up' : 'text-ink'}`}>{k.sign}{formatPaisa(p.amount)}</p>
                {p.status === 'failed' && <p className="text-xs font-semibold text-accent">Failed</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
