// ALL money values are paisa, exactly like the backend sends them (₹1 = 100).
const ago = (m) => new Date(Date.now() - m * 60000).toISOString();

export const mockDashboard = {
  wallets: [
    { id: 'platform_cash', label: 'Platform cash', balance: 184265000, in: 6250000, out: 2840000, change: 4.2 },
    { id: 'gateway_cash', label: 'Gateway cash', balance: 96480000, in: 18450000, out: 12000000, change: 2.1 },
    { id: 'tournament_clearance', label: 'Tournament clearance', balance: 52375000, in: 14200000, out: 9650000, change: -1.3 },
    { id: 'expense', label: 'Expense', balance: 8920000, in: 1250000, out: 0, change: 8.5, goodWhenUp: false },
    { id: 'revenue', label: 'Revenue', balance: 31560000, in: 4820000, out: 0, change: 6.8 },
  ],
  users: { cash: 245830000, bonus: 38475000, cashIn: 21500000, cashOut: 14300000, bonusIn: 1250000, bonusOut: 960000, count: 18420 },
  today: [
    { id: 'deposits', label: 'Deposits', kind: 'money', amount: 18450000, count: 312, change: 12 },
    { id: 'withdrawals', label: 'Withdrawals', kind: 'money', amount: 9450000, count: 86, change: -4 },
    { id: 'entryFees', label: 'Entry fees', kind: 'money', amount: 14200000, count: 1420, change: 9 },
    { id: 'payouts', label: 'Prize payouts', kind: 'money', amount: 9650000, count: 164, change: 5 },
    { id: 'newUsers', label: 'New users', kind: 'count', count: 187, change: 14 },
    { id: 'matches', label: 'Matches done', kind: 'count', count: 42, change: 3 },
  ],
  series: [
    { day: 'Mon', revenue: 3120000, expense: 1250000 },
    { day: 'Tue', revenue: 3680000, expense: 1100000 },
    { day: 'Wed', revenue: 2940000, expense: 1480000 },
    { day: 'Thu', revenue: 4310000, expense: 1320000 },
    { day: 'Fri', revenue: 5260000, expense: 1900000 },
    { day: 'Sat', revenue: 6120000, expense: 2100000 },
    { day: 'Sun', revenue: 4820000, expense: 1250000 },
  ],
  alerts: [
    { id: 'a1', severity: 'critical', title: 'Gateway balance low', text: 'Gateway cash is close to the safety limit. Top up before withdrawals pile up.', time: ago(4) },
    { id: 'a2', severity: 'critical', title: 'Fraud flag: 2 accounts', text: 'Two accounts share one device ID in BGMI Squad Showdown.', time: ago(37) },
    { id: 'a3', severity: 'warning', title: '18 withdrawals pending over 24h', text: 'Review and process them to avoid player complaints.', time: ago(62) },
    { id: 'a4', severity: 'warning', title: '3 failed payments in the last hour', text: 'Could be a gateway issue. Check the payment logs.', time: ago(75) },
    { id: 'a5', severity: 'info', title: 'Clearance reconciled', text: 'Tournament clearance matched with no difference.', time: ago(240) },
  ],
};
