import { createSlice, nanoid } from '@reduxjs/toolkit';

const ago = (m) => new Date(Date.now() - m * 60000).toISOString();

// Fake seed data. Replace with a fetch + socket/SSE subscription.
const seed = [
  { id: 'n1', kind: 'alert', title: 'Gateway balance low', text: 'Gateway cash is below the safety limit.', time: ago(4), read: false },
  { id: 'n2', kind: 'payment', title: 'Large withdrawal request', text: 'Rudra_X requested ₹5,000.00', time: ago(11), read: false },
  { id: 'n3', kind: 'payment', title: 'Payment failed', text: 'Deposit of ₹500.00 by Zoya.gg failed.', time: ago(26), read: false },
  { id: 'n4', kind: 'system', title: 'Reconciliation complete', text: 'Tournament clearance matched with no difference.', time: ago(95), read: true },
  { id: 'n5', kind: 'alert', title: 'Fraud flag raised', text: '2 accounts share one device ID.', time: ago(180), read: true },
  { id: 'n6', kind: 'system', title: 'New admin login', text: 'Signed in from a new browser.', time: ago(1300), read: true },
];

const slice = createSlice({
  name: 'notifications',
  initialState: { items: seed },
  reducers: {
    addNotification: {
      reducer: (s, a) => { s.items.unshift(a.payload); s.items.splice(60); },
      prepare: (n) => ({ payload: { id: nanoid(), read: false, time: new Date().toISOString(), ...n } }),
    },
    markAllRead: (s) => { s.items.forEach((i) => { i.read = true; }); },
  },
});

export const { addNotification, markAllRead } = slice.actions;
export const selectNotifications = (state) => state.notifications.items;
export default slice.reducer;
