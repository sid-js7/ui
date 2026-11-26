import { createBrowserRouter, redirect } from 'react-router-dom';
import PublicLayout from '../shared/layouts/PublicLayout';
import AuthLayout from '../shared/layouts/AuthLayout';
import RouteError from '../shared/layouts/RouteError';
import LandingPage from '../features/landing/pages/LandingPage';
import LegalPage, { legalLoader } from '../features/legal/pages/LegalPage';
import VerifyEmailPage from '../features/auth/pages/VerifyEmailPage';
import AdminLoginPage from '../features/auth/pages/AdminLoginPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import AdminLayout from '../features/admin/components/AdminLayout';
import DashboardPage from '../features/admin/pages/DashboardPage';
import ComingSoon from '../features/admin/pages/ComingSoon';
import { fetchLanding } from '../features/landing/landingSlice';
import { verifyEmail } from '../features/auth/authSlice';
import { fetchDashboard } from '../features/admin/dashboardSlice';

// Data router: loaders receive the store so they can dispatch thunks and guard routes.
export const createRouter = (store) => {
  const requireAdmin = () => (store.getState().auth.token ? null : redirect('/admin/login'));
  const guestOnly = () => (store.getState().auth.token ? redirect('/admin') : null);

  return createBrowserRouter([
    {
      element: <PublicLayout />,
      errorElement: <RouteError />,
      children: [
        { index: true, element: <LandingPage />, loader: () => { store.dispatch(fetchLanding()); return null; } },
        {
          // /verify-email/:token (also accepts /verify-email?token=...)
          path: 'verify-email/:token?',
          element: <VerifyEmailPage />,
          loader: ({ params, request }) => {
            const token = params.token || new URL(request.url).searchParams.get('token');
            if (token) store.dispatch(verifyEmail(token)); // once per navigation, so a single-use token isn't sent twice
            return null;
          },
        },
        { path: ':slug', element: <LegalPage />, loader: legalLoader },
      ],
    },
    {
      element: <AuthLayout />,
      errorElement: <RouteError />,
      loader: guestOnly,
      children: [
        { path: 'admin/login', element: <AdminLoginPage /> },
        { path: 'admin/forgot-password', element: <ForgotPasswordPage /> },
      ],
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      errorElement: <RouteError />,
      
      children: [
        { index: true, element: <DashboardPage />, loader: () => { store.dispatch(fetchDashboard()); return null; } },
        { path: '*', element: <ComingSoon /> }, // replace each section as you build it
      ],
    },
  ]);
};
