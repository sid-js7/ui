import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import Panel from './Panel';
import { timeAgo } from '../../../shared/utils/format';

const styles = {
  critical: { box: 'border-accent bg-accent/10', tag: 'bg-accent text-white' },
  warning: { box: 'border-gold bg-gold/10', tag: 'bg-gold text-bg' },
  info: { box: 'border-line bg-bg', tag: 'bg-ink text-bg' },
};

export default function AlertsPanel() {
  const { alerts } = useSelector(selectDashboard);
  const urgent = alerts.filter((a) => a.severity === 'critical').length;
  return (
    <Panel title="System alerts" className="lg:col-span-4" delay={730}
           right={urgent > 0 && <span className="bg-accent px-2 font-display text-lg uppercase text-white">{urgent} critical</span>}>
      <ul className="space-y-3">
        {alerts.map((a) => (
          <li key={a.id} className={`border-l-4 p-3 ${styles[a.severity].box}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`px-2 font-display text-sm uppercase ${styles[a.severity].tag}`}>{a.severity}</span>
              <span className="text-xs text-mute">{timeAgo(a.time)}</span>
            </div>
            <p className="mt-1.5 text-sm font-semibold text-ink">{a.title}</p>
            <p className="text-sm text-mute">{a.text}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
