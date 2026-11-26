import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../shared/api';
import { mockDashboard } from './mockData';
import { makePayment } from './paymentGenerator';

// TODO: point at your real endpoint. Falls back to fake data.
export const fetchDashboard = createAsyncThunk('dashboard/fetch', async () => {
  if (!import.meta.env.VITE_API_URL) return mockDashboard;
  try { return await api('/admin/dashboard'); } catch { return mockDashboard; }
});

const initialPayments = Array.from({ length: 8 }, (_, i) => ({
  ...makePayment(), time: new Date(Date.now() - (i + 1) * 47000).toISOString(),
}));

const mv = (wallet, amt, dir) => {
  if (dir > 0) { wallet.balance += amt; wallet.in += amt; } else { wallet.balance -= amt; wallet.out += amt; }
};

const slice = createSlice({
  name: 'dashboard',
  initialState: { ...mockDashboard, livePayments: initialPayments, status: 'idle' },
  reducers: {
    // A live payment also moves the related wallets, so cards update in real time.
    pushLivePayment: (s, { payload: p }) => {
      s.livePayments.unshift(p);
      s.livePayments.splice(40);
      if (p.status !== 'success') return;
      const w = (id) => s.wallets.find((x) => x.id === id);
      const t = (id) => s.today.find((x) => x.id === id);
      const a = p.amount;
      const tally = (id) => { t(id).amount += a; t(id).count += 1; };
      if (p.type === 'deposit') { mv(w('gateway_cash'), a, 1); s.users.cash += a; s.users.cashIn += a; tally('deposits'); }
      if (p.type === 'withdrawal') { mv(w('platform_cash'), a, -1); s.users.cash -= a; s.users.cashOut += a; tally('withdrawals'); }
      if (p.type === 'entry_fee') { mv(w('tournament_clearance'), a, 1); s.users.cash -= a; s.users.cashOut += a; tally('entryFees'); }
      if (p.type === 'payout') { mv(w('tournament_clearance'), a, -1); s.users.cash += a; s.users.cashIn += a; tally('payouts'); }
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchDashboard.pending, (s) => { s.status = 'loading'; })
     .addCase(fetchDashboard.fulfilled, (s, a) => ({ ...s, ...a.payload, status: 'ready' }));
  },
});

export const { pushLivePayment } = slice.actions;
export const selectDashboard = (state) => state.dashboard;
export default slice.reducer;
