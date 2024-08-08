import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../Security/helpers/axios';


const initialState = {
  notices: [],
  loading: false,
  error: null,
};


export const fetchNotices = createAsyncThunk('notices/fetchNotices', async () => {
  try {

    const response = await axiosInstance.get('/getNotice');
    return response.data.notices;
  } catch (error) {
    return error.message;
  }
});

const noticeSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.loading = false; 
        state.notices = action.payload;
      }) 
      .addCase(fetchNotices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export const selectNotices = (state) => state.notices.notices;
export const selectLoading = (state) => state.notices.loading;
export const selectError = (state) => state.notices.error;
 
export default noticeSlice.reducer;