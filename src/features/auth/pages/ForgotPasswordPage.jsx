import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../../shared/components/Field';
import { forgotPassword, resetForgot, selectForgot } from '../authSlice';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectForgot);
  const [email, setEmail] = useState('');

  useEffect(() => { dispatch(resetForgot()); }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email.trim()));
  };

  return (
    <div className="hud w-full max-w-md border border-line bg-panel shadow-[10px_10px_0_var(--ink)]">
      <p className="bg-ink px-5 py-3 font-display text-xl uppercase tracking-wider text-bg">Reset password</p>
      <div className="px-6 py-8">
        {status === 'success' ? (
          <div className="text-center">
            <div className="mx-auto grid h-20 w-20 -skew-x-6 place-items-center bg-accent text-white">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" /><path d="M3 7l9 6 9-6" /></svg>
            </div>
            <h1 className="mt-6 text-5xl font-bold leading-none text-ink">Check your email</h1>
            <p className="mt-3 text-mute">If an admin account exists for <b className="text-ink">{email}</b>, a password reset link is on its way. It may take a minute.</p>
            <Link to="/admin/login" className="cut mt-8 inline-block border-2 border-ink px-8 py-3 font-display text-2xl font-semibold uppercase tracking-wider text-ink transition hover:bg-ink hover:text-bg">Back to login</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <h1 className="text-5xl font-bold leading-none text-ink">Forgot password?</h1>
              <p className="mt-2 text-mute">Enter your admin email and we will send you a link to reset your password.</p>
            </div>
            {error && <p role="alert" className="border border-accent bg-accent/10 px-4 py-3 text-sm text-accent">{error}</p>}
            <Field label="Email" id="email" type="email" autoComplete="username" required
                   value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@arenax.gg" />
            <button type="submit" disabled={status === 'loading'}
                    className="cut w-full bg-accent py-3 font-display text-2xl font-semibold uppercase tracking-wider text-white transition hover:brightness-110 disabled:opacity-60">
              {status === 'loading' ? 'Sending...' : 'Send reset link'}
            </button>
            <p className="text-center"><Link to="/admin/login" className="text-sm text-mute underline-offset-4 hover:text-accent hover:underline">Back to login</Link></p>
          </form>
        )}
      </div>
    </div>
  );
}
