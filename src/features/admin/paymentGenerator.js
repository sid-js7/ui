// Fake payment generator (amounts in paisa: 5000 = ₹50).
const names = ['Rudra_X', 'Sniper_Aarav', 'NightWolf07', 'Kaal_Op', 'Zoya.gg', 'Vikram_VK', 'Aarya_09', 'Dev_Rex'];
const pick = (a) => a[Math.floor(Math.random() * a.length)];
let seq = 100;

// Amounts are in paisa (5000 = ₹50).
export const makePayment = () => ({
  id: `p${++seq}`,
  type: pick(['deposit', 'deposit', 'withdrawal', 'entry_fee', 'entry_fee', 'payout']),
  user: pick(names),
  amount: pick([2000, 5000, 10000, 20000, 50000, 150000, 500000]),
  method: pick(['UPI', 'Card', 'Netbanking']),
  status: Math.random() < 0.1 ? 'failed' : 'success',
  time: new Date().toISOString(),
});

