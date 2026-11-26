import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLiveFeed } from '../liveFeed';

// Desktop: fixed viewport, nothing scrolls except boxes inside pages. Mobile: normal page scroll.
export default function AdminLayout() {
  const [nav, setNav] = useState(false);
  useLiveFeed();
  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden">
      <Sidebar open={nav} onClose={() => setNav(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setNav(true)} />
        <main className="min-h-0 flex-1 p-4 lg:overflow-hidden"><Outlet /></main>
      </div>
    </div>
  );
}
