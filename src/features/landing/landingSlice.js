import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mockLanding } from './mockData';

// TODO: point this at your real public endpoint(s).
export const fetchLanding = createAsyncThunk('landing/fetch', async () => {
  const base = import.meta.env.VITE_API_URL;
  if (!base) return mockLanding;
  try {
    const res = await fetch(`${base}/public/landing`);
    if (!res.ok) throw new Error('bad response');
    return await res.json();
  } catch {
    return mockLanding;
  }
});

const landingSlice = createSlice({
  name: 'landing',
  initialState: { ...mockLanding, status: 'idle' },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchLanding.pending, (s) => { s.status = 'loading'; })
     .addCase(fetchLanding.fulfilled, (s, a) => ({ ...s, ...a.payload, status: 'ready' }));
  },
});

export const selectLanding = (state) => state.landing;
export default landingSlice.reducer;
