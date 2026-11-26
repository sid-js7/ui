import { configureStore } from '@reduxjs/toolkit';
import landingReducer from '../features/landing/landingSlice';
import themeReducer from '../features/theme/themeSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/admin/dashboardSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

// Register each new feature's reducer here
export const store = configureStore({
  reducer: {
    landing: landingReducer, theme: themeReducer, auth: authReducer,
    dashboard: dashboardReducer, notifications: notificationsReducer,
  },
});
