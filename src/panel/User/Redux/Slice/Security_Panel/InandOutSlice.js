import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../Security/helpers/axios';

export const fetchVisitors = createAsyncThunk(
  'visitors/fetchVisitors',
  async (societyId) => {
    try {
      const response = await axiosInstance.get(`/getAllVisitorsBySocietyId/${societyId}`);
      return response.data.visitors;
    } catch (error) {
      throw Error('Failed to fetch visitors: ' + error.message);
    }
  }
);

const visitorsSlice = createSlice({
  name: 'visitors',
  initialState: {
    visitors: [], // Ensure this is initialized as an empty array or with data structure matching your expected format
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.visitors = action.payload;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default visitorsSlice.reducer;
