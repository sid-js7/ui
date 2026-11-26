import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import Panel from './Panel';
import { compactPaisa, formatPaisa } from '../../../shared/utils/format';

export default function RevenueChart() {
  const { series } = useSelector(selectDashboard);
  const max = Math.max(...series.flatMap((d) => [d.revenue, d.expense]));
  const rev = series.reduce((a, d) => a + d.revenue, 0);
  const exp = series.reduce((a, d) => a + d.expense, 0);
  const legend = (
    <div className="flex gap-3 text-xs text-mute">
      <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 bg-accent" />Revenue</span>
      <span className="flex items-center gap-1"><i className="h-2.5 w-2.5 bg-ink" />Expense</span>
    </div>
  );
  return (
    <Panel title="Last 7 days" right={legend} className="lg:col-span-5" delay={450}>
      <div className="flex flex-col lg:h-full">
        <div className="mb-3 flex gap-8">
          <div><p className="text-xs text-mute">Revenue</p><p className="font-display text-3xl font-bold leading-none text-ink">{compactPaisa(rev)}</p></div>
          <div><p className="text-xs text-mute">Net profit</p><p className="font-display text-3xl font-bold leading-none text-up">{compactPaisa(rev - exp)}</p></div>
        </div>
        <div className="relative flex h-44 items-end gap-3 border-b border-line lg:h-auto lg:min-h-0 lg:flex-1">
          {[25, 50, 75].map((p) => <span key={p} className="absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${p}%` }} />)}
          {series.map((d, i) => (
            <div key={d.day} className="relative flex h-full flex-1 items-end justify-center gap-1">
              <div title={`${d.day} revenue ${formatPaisa(d.revenue)}`} className="w-full max-w-7 origin-bottom animate-bar bg-accent"
                   style={{ height: `${(d.revenue / max) * 100}%`, animationDelay: `${600 + i * 90}ms` }} />
              <div title={`${d.day} expense ${formatPaisa(d.expense)}`} className="w-full max-w-7 origin-bottom animate-bar bg-ink"
                   style={{ height: `${(d.expense / max) * 100}%`, animationDelay: `${650 + i * 90}ms` }} />
            </div>
          ))}
        </div>
        <div className="mt-1 flex gap-3">{series.map((d) => <span key={d.day} className="flex-1 text-center text-xs text-mute">{d.day}</span>)}</div>
      </div>
    </Panel>
  );
}
