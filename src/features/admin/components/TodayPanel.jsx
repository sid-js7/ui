import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import Panel from './Panel';
import AnimatedNumber from '../../../shared/components/AnimatedNumber';
import { toRupees } from '../../../shared/utils/format';

export default function TodayPanel() {
  const { today } = useSelector(selectDashboard);
  return (
    <Panel title="What happened today" right={<span className="text-xs text-mute">vs yesterday</span>} className="lg:col-span-4" delay={520}>
      <div className="grid grid-cols-2 gap-3">
        {today.map((t) => (
          <div key={t.id} className="border border-line bg-bg p-3">
            <p className="text-xs text-mute">{t.label}</p>
            {t.kind === 'money'
              ? <AnimatedNumber value={toRupees(t.amount)} prefix="₹" className="block font-display text-2xl font-bold leading-tight text-ink" />
              : <AnimatedNumber value={t.count} className="block font-display text-2xl font-bold leading-tight text-ink" />}
            <p className="mt-1 flex justify-between text-xs">
              <span className="text-mute">{t.kind === 'money' ? `${t.count.toLocaleString('en-IN')} txns` : 'today'}</span>
              <span className={t.change >= 0 ? 'text-up' : 'text-accent'}>{t.change >= 0 ? '▲' : '▼'} {Math.abs(t.change)}%</span>
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
