import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import Panel from './Panel';
import AnimatedNumber from '../../../shared/components/AnimatedNumber';
import { compactPaisa, toRupees } from '../../../shared/utils/format';

export default function UserWalletsPanel() {
  const { users, wallets } = useSelector(selectDashboard);
  const total = users.cash + users.bonus;
  const cashShare = (users.cash / total) * 100;
  const bal = (id) => wallets.find((w) => w.id === id).balance;
  const coverage = ((bal('platform_cash') + bal('gateway_cash')) / users.cash) * 100;
  return (
    <Panel title="Player wallets" className="lg:col-span-3" delay={590}>
      <div className="space-y-4">
        <div>
          <p className="text-xs text-mute">Cash balance</p>
          <AnimatedNumber value={toRupees(users.cash)} prefix="₹" className="block font-display text-3xl font-bold leading-none text-ink" />
        </div>
        <div>
          <p className="text-xs text-mute">Bonus balance</p>
          <AnimatedNumber value={toRupees(users.bonus)} prefix="₹" className="block font-display text-3xl font-bold leading-none text-gold" />
        </div>
        <div>
          <div className="flex h-3 overflow-hidden bg-bg">
            <div className="origin-left animate-grow bg-ink" style={{ width: `${cashShare}%` }} />
            <div className="origin-left animate-grow bg-gold" style={{ width: `${100 - cashShare}%`, animationDelay: '0.2s' }} />
          </div>
          <p className="mt-1 flex justify-between text-xs text-mute"><span>Cash {cashShare.toFixed(0)}%</span><span>Bonus {(100 - cashShare).toFixed(0)}%</span></p>
        </div>
        <div className="border-t border-line pt-3 text-sm">
          <p className="flex justify-between"><span className="text-mute">Total owed to players</span><b className="text-ink">{compactPaisa(total)}</b></p>
          <p className="flex justify-between"><span className="text-mute">Wallets</span><b className="text-ink">{users.count.toLocaleString('en-IN')}</b></p>
          <p className="mt-2 flex justify-between"><span className="text-mute">Cash coverage</span><b className={coverage >= 100 ? 'text-up' : 'text-accent'}>{coverage.toFixed(0)}%</b></p>
          <div className="mt-1 h-2 bg-bg"><div className={`h-2 origin-left animate-grow ${coverage >= 100 ? 'bg-up' : 'bg-accent'}`} style={{ width: `${Math.min(coverage, 100)}%` }} /></div>
        </div>
      </div>
    </Panel>
  );
}
