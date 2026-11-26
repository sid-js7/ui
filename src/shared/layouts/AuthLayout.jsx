import { Link, Outlet } from 'react-router-dom';
import { APP_NAME } from '../config';
import ThemeToggle from '../components/ThemeToggle';

const Logo = ({ className = '' }) => (
  <Link to="/" className={`flex items-center gap-2 font-display text-3xl font-bold uppercase tracking-wider ${className}`}>
    <span className="grid h-8 w-8 -skew-x-12 place-items-center bg-white text-xl text-accent lg:bg-accent lg:text-white">A</span>
    {APP_NAME}
  </Link>
);

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <aside className="stripes hidden flex-col justify-between bg-accent p-12 text-white lg:flex">
        <Logo />
        <div>
          <h2 className="text-[8rem] font-bold leading-[0.8]">Run the arena.</h2>
          <p className="mt-6 max-w-sm text-lg text-white/90">Manage tournaments, players, payouts and withdrawals from one console.</p>
        </div>
        <p className="text-sm text-white/80">Authorized staff only. All activity is logged.</p>
      </aside>
      <main className="flex flex-col">
        <div className="flex items-center justify-between p-5">
          <Logo className="text-ink lg:invisible" />
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 pb-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
