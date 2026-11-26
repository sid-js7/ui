import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  adminLoginRequest, forgotPasswordRequest, resendVerificationRequest, verifyEmailRequest,
} from './authApi';

const SESSION_KEY = 'admin_session';
const loadSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || {}; } catch { return {}; } };

const run = (fn) => async (arg, { rejectWithValue }) => {
  try { return await fn(arg); } catch (e) { return rejectWithValue(e.message); }
};

export const verifyEmail = createAsyncThunk('auth/verifyEmail', run(verifyEmailRequest));
export const resendVerification = createAsyncThunk('auth/resendVerification', run(resendVerificationRequest));
export const forgotPassword = createAsyncThunk('auth/forgotPassword', run(forgotPasswordRequest));

export const adminLogin = createAsyncThunk('auth/adminLogin', async (credentials, { rejectWithValue }) => {
  try {
    const { token, user } = await adminLoginRequest(credentials);
    try { localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user })); } catch {}
    return { token, user };
  } catch (e) { return rejectWithValue(e.message); }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
});

const idle = { status: 'idle', error: null };
const loading = { status: 'loading', error: null };
const ok = { status: 'success', error: null };
const fail = (fallback) => (s, a) => ({ status: 'error', error: a.payload || fallback });

const session = loadSession();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: session.token || null, user: session.user || null,
    verify: idle, resend: idle, login: idle, forgot: idle,
  },
  reducers: {
    resetForgot: (s) => { s.forgot = idle; },
  },
  extraReducers: (b) => {
    b.addCase(verifyEmail.pending, (s) => { s.verify = loading; s.resend = idle; })
     .addCase(verifyEmail.fulfilled, (s) => { s.verify = ok; })
     .addCase(verifyEmail.rejected, (s, a) => { s.verify = fail('Verification failed.')(s, a); })
     .addCase(resendVerification.pending, (s) => { s.resend = loading; })
     .addCase(resendVerification.fulfilled, (s) => { s.resend = ok; })
     .addCase(resendVerification.rejected, (s, a) => { s.resend = fail('Could not send the email.')(s, a); })
     .addCase(adminLogin.pending, (s) => { s.login = loading; })
     .addCase(adminLogin.fulfilled, (s, a) => { s.login = ok; s.token = a.payload.token; s.user = a.payload.user; })
     .addCase(adminLogin.rejected, (s, a) => { s.login = fail('Login failed.')(s, a); })
     .addCase(forgotPassword.pending, (s) => { s.forgot = loading; })
     .addCase(forgotPassword.fulfilled, (s) => { s.forgot = ok; })
     .addCase(forgotPassword.rejected, (s, a) => { s.forgot = fail('Could not send the reset email.')(s, a); })
     .addCase(logout.fulfilled, (s) => { s.token = null; s.user = null; s.login = idle; });
  },
});

export const { resetForgot } = authSlice.actions;
export const selectVerify = (state) => state.auth.verify;
export const selectResend = (state) => state.auth.resend;
export const selectLogin = (state) => state.auth.login;
export const selectForgot = (state) => state.auth.forgot;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
