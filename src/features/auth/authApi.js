import { api } from '../../shared/api';

// TODO: adjust these paths/payloads to match your backend.
export const verifyEmailRequest = (token) => api('/auth/verify-email', { method: 'POST', body: { token } });
export const resendVerificationRequest = (email) => api('/auth/resend-verification', { method: 'POST', body: { email } });
export const adminLoginRequest = (credentials) => api('/auth/admin/login', { method: 'POST', body: credentials }); // expects { token, user }
export const forgotPasswordRequest = (email) => api('/auth/forgot-password', { method: 'POST', body: { email } });
