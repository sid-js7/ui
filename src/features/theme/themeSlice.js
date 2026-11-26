import { createSlice } from '@reduxjs/toolkit';

const stored = () => { try { return localStorage.getItem('theme'); } catch { return null; } };

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: stored() || 'dark' },
  reducers: {
    toggleTheme: (s) => { s.mode = s.mode === 'dark' ? 'light' : 'dark'; },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.mode;
export default themeSlice.reducer;
