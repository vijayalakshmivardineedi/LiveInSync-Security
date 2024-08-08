import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../Security/helpers/axios';



export const fetchFrequentVisitors = createAsyncThunk(

  'frequentVisitors/fetchFrequentVisitors',
  async (societyId) => {
    const response = await axiosInstance.get(`/getAllServicePersons/${societyId}`);
    return response.data;
  }
);

const frequentVisitorSlice = createSlice({
  name: 'frequentVisitors',
  initialState: {
    visitors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFrequentVisitors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFrequentVisitors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.visitors = action.payload;
      })
      .addCase(fetchFrequentVisitors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default frequentVisitorSlice.reducer;