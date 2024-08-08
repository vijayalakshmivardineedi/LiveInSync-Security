import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch frequent visitors
export const fetchFrequentVisitors = createAsyncThunk(
  'frequentVisitors/fetchFrequentVisitors',
  async ({ societyId, block, flatNo }) => {
    try {
      const response = await axios.get(`http://192.168.29.226:2000/api/getFrequentVisitors/${societyId}/${block}/${flatNo}`);
      return response.data.frequentVisitors;
    } catch (error) {
      throw new Error('Failed to fetch frequent visitors');
    }
  }
);

// Async thunk to delete a visitor
export const deleteFrequentVisitor = createAsyncThunk(
  'frequentVisitors/deleteFrequentVisitor',
  async ({ societyId, block, flatNo, visitorId }) => {
    try {
      await axios.delete(`http://192.168.29.226:2000/api/deleteFrequentVisitor/${societyId}/${block}/${flatNo}/${visitorId}`);
      return visitorId;
    } catch (error) {
      throw new Error('Failed to delete visitor');
    }
  }
);

const initialState = {
  visitors: [],
  fetchStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  deleteStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const frequentVisitorsSlice = createSlice({
  name: 'frequentVisitors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFrequentVisitors.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchFrequentVisitors.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.error = null;
        state.visitors = action.payload;
      })
      .addCase(fetchFrequentVisitors.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteFrequentVisitor.pending, (state) => {
        state.deleteStatus = 'loading';
        state.error = null;
      })
      .addCase(deleteFrequentVisitor.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.error = null;
       state.visitors = state.visitors.filter(visitor => visitor._id !== action.payload);
       console.log( state.visitors)
      })
      .addCase(deleteFrequentVisitor.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export default frequentVisitorsSlice.reducer;
