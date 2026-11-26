import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { pushLivePayment } from './dashboardSlice';
import { addNotification } from '../notifications/notificationsSlice';
import { formatPaisa } from '../../shared/utils/format';
import { makePayment } from './paymentGenerator';

const labels = { deposit: 'Deposit', withdrawal: 'Withdrawal', entry_fee: 'Entry fee', payout: 'Prize payout' };

// TODO: replace this simulator with your socket / SSE subscription and dispatch the same actions.
export function useLiveFeed() {
  const dispatch = useDispatch();
  useEffect(() => {
    const t = setInterval(() => {
      const p = makePayment();
      dispatch(pushLivePayment(p));
      if (p.status === 'failed' || p.type === 'deposit' || p.type === 'withdrawal') {
        dispatch(addNotification({
          kind: p.status === 'failed' ? 'alert' : 'payment',
          title: p.status === 'failed' ? 'Payment failed' : `${labels[p.type]} received`,
          text: `${p.user}, ${formatPaisa(p.amount)} via ${p.method}`,
        }));
      }
    }, 5000);
    return () => clearInterval(t);
  }, [dispatch]);
}
