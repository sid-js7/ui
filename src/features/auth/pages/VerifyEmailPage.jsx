import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TELEGRAM_BOT_URL } from '../../../shared/config';
import { resendVerification, selectResend, selectVerify } from '../authSlice';

const btn = 'cut inline-block px-8 py-3 text-center font-display text-2xl font-semibold uppercase tracking-wider transition hover:-translate-y-0.5';

function Badge({ tone, children }) {
  const color = tone === 'success' ? 'bg-accent' : 'bg-ink';
  return <div className={`mx-auto grid h-20 w-20 -skew-x-6 place-items-center text-white ${color}`}>{children}</div>;
}

function ResendForm() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectResend);
  const [email, setEmail] = useState('');
  const sent = status === 'success';

  const submit = (e) => {
    e.preventDefault();
    if (email.trim()) dispatch(resendVerification(email.trim()));
  };

  if (sent) return <p className="mt-6 border border-line bg-bg px-4 py-3 text-ink">New link sent. Check your inbox and spam folder.</p>;

  return (
    <form onSubmit={submit} className="mt-6 text-left">
      <label htmlFor="email" className="font-display text-xl uppercase tracking-wide text-ink">Get a new link</label>
      <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
             placeholder="you@example.com"
             className="mt-2 w-full border border-line bg-bg px-4 py-3 text-ink placeholder:text-mute focus:border-accent focus:outline-none" />
      {error && <p role="alert" className="mt-2 text-sm text-accent">{error}</p>}
      <button type="submit" disabled={status === 'loading'}
              className={`${btn} mt-4 w-full bg-accent text-white disabled:opacity-60`}>
        {status === 'loading' ? 'Sending...' : 'Send verification email'}
      </button>
    </form>
  );
}

export default function VerifyEmailPage() {
  const { token: paramToken } = useParams();
  const [search] = useSearchParams();
  const token = paramToken || search.get('token');
  const { status: verifyStatus, error } = useSelector(selectVerify);
  const status = !token ? 'invalid' : verifyStatus === 'idle' ? 'loading' : verifyStatus;

  const view = {
    loading: { title: 'Verifying your email', text: 'Hold tight, this only takes a moment.' },
    success: { title: 'Email verified', text: 'Your account is active. Open the Telegram bot to join your first match.' },
    error: { title: 'Verification failed', text: error },
    invalid: { title: 'Invalid link', text: 'This verification link is missing its token. Open the link from your email again.' },
  }[status];

  return (
    <section className="grid min-h-[70vh] place-items-center px-5 py-20">
      <div className="hud w-full max-w-md border border-line bg-panel shadow-[10px_10px_0_var(--ink)]" aria-live="polite">
        <p className="bg-ink px-5 py-3 font-display text-xl uppercase tracking-wider text-bg">Account verification</p>
        <div className="px-6 py-10 text-center">
          {status === 'loading' && (
            <div className="mx-auto h-14 w-14 rotate-45 animate-spin border-4 border-line border-t-accent" role="status" aria-label="Loading" />
          )}
          {status === 'success' && (
            <Badge tone="success">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
            </Badge>
          )}
          {(status === 'error' || status === 'invalid') && (
            <Badge tone="error">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </Badge>
          )}

          <h1 className="mt-6 text-5xl font-bold leading-none text-ink">{view.title}</h1>
          <p className="mt-3 text-mute">{view.text}</p>

          {status === 'success' && (
            <div className="mt-8 flex flex-col gap-3">
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer" className={`${btn} bg-accent text-white`}>Open Telegram bot</a>
              <Link to="/" className={`${btn} border-2 border-ink text-ink hover:bg-ink hover:text-bg`}>Back to home</Link>
            </div>
          )}
          {status === 'error' && <ResendForm />}
          {status === 'invalid' && (
            <Link to="/" className={`${btn} mt-8 border-2 border-ink text-ink hover:bg-ink hover:text-bg`}>Back to home</Link>
          )}
        </div>
      </div>
    </section>
  );
}
