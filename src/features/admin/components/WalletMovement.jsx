import { useSelector } from 'react-redux';
import { selectDashboard } from '../dashboardSlice';
import Panel from './Panel';
import { compactPaisa } from '../../../shared/utils/format';

export default function WalletMovement() {
  const { wallets, users } = useSelector(selectDashboard);
  const rows = [
    ...wallets.map((w) => ({ id: w.id, label: w.label, in: w.in, out: w.out })),
    { id: 'u_cash', label: 'Player cash', in: users.cashIn, out: users.cashOut },
    { id: 'u_bonus', label: 'Player bonus', in: users.bonusIn, out: users.bonusOut },
  ];
  return (
    <Panel title="Wallet movement today" className="lg:col-span-4" delay={800}>
      <table className="w-full text-sm">
        <thead className="text-left text-xs text-mute">
          <tr><th className="pb-2 font-normal">Wallet</th><th className="pb-2 text-right font-normal">In</th><th className="pb-2 text-right font-normal">Out</th><th className="pb-2 text-right font-normal">Net</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const net = r.in - r.out;
            return (
              <tr key={r.id} className="border-t border-line">
                <td className="py-2.5 font-semibold text-ink">{r.label}</td>
                <td className="py-2.5 text-right tabular-nums text-up">{compactPaisa(r.in)}</td>
                <td className="py-2.5 text-right tabular-nums text-mute">{compactPaisa(r.out)}</td>
                <td className={`py-2.5 text-right font-semibold tabular-nums ${net >= 0 ? 'text-up' : 'text-accent'}`}>{net >= 0 ? '+' : '-'}{compactPaisa(net)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
}
