// noticeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotices = createAsyncThunk('notices/fetchNotices', async () => {
  try {
    const response = await axios.get('http://192.168.29.226:2000/api/getNotice');
    // console.log(response.data.notices)
    return response.data.notices; 

  } catch (error) {
    throw error;
  }
});

const noticeSlice = createSlice({
  name: 'notices',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default noticeSlice.reducer;
