import WalletCards from '../components/WalletCards';
import RevenueChart from '../components/RevenueChart';
import TodayPanel from '../components/TodayPanel';
import UserWalletsPanel from '../components/UserWalletsPanel';
import LivePayments from '../components/LivePayments';
import AlertsPanel from '../components/AlertsPanel';
import WalletMovement from '../components/WalletMovement';

// Desktop: three rows that exactly fill the viewport; each box scrolls on its own if it overflows.
export default function DashboardPage() {
  return (
    <div className="grid gap-4 lg:h-full lg:grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)]">
      <WalletCards />
      <div className="grid min-h-0 gap-4 lg:grid-cols-12">
        <RevenueChart /><TodayPanel /><UserWalletsPanel />
      </div>
      <div className="grid min-h-0 gap-4 lg:grid-cols-12">
        <LivePayments /><AlertsPanel /><WalletMovement />
      </div>
    </div>
  );
}
