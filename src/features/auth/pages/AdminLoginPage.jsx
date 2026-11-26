import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Field from '../../../shared/components/Field';
import { adminLogin, selectLogin } from '../authSlice';

export default function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(selectLogin);
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const result = await dispatch(adminLogin({ email: form.email.trim(), password: form.password }));
    if (adminLogin.fulfilled.match(result)) navigate('/admin', { replace: true });
  };

  return (
    <div className="hud w-full max-w-md border border-line bg-panel shadow-[10px_10px_0_var(--ink)]">
      <p className="bg-ink px-5 py-3 font-display text-xl uppercase tracking-wider text-bg">Admin login</p>
      <form onSubmit={submit} className="space-y-5 px-6 py-8">
        <div>
          <h1 className="text-5xl font-bold leading-none text-ink">Welcome back</h1>
          <p className="mt-2 text-mute">Sign in to open the admin console.</p>
        </div>

        {error && <p role="alert" className="border border-accent bg-accent/10 px-4 py-3 text-sm text-accent">{error}</p>}

        <Field label="Email" id="email" type="email" autoComplete="username" required
               value={form.email} onChange={set('email')} placeholder="admin@arenax.gg" />
        <Field label="Password" id="password" type={show ? 'text' : 'password'} autoComplete="current-password" required
               value={form.password} onChange={set('password')} placeholder="Enter your password"
               right={<button type="button" onClick={() => setShow(!show)} aria-pressed={show}
                              className="font-display text-lg uppercase text-mute hover:text-accent">{show ? 'Hide' : 'Show'}</button>} />

        <div className="text-right">
          <Link to="/admin/forgot-password" className="text-sm text-mute underline-offset-4 hover:text-accent hover:underline">Forgot password?</Link>
        </div>

        <button type="submit" disabled={status === 'loading'}
                className="cut w-full bg-accent py-3 font-display text-2xl font-semibold uppercase tracking-wider text-white transition hover:brightness-110 disabled:opacity-60">
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
