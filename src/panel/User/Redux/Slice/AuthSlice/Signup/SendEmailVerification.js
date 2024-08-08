import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendVerificationEmail = createAsyncThunk(
  'emailVerification/sendVerificationEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://192.168.29.226:2000/api/user/sendVerificationEmail`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const emailVerificationSlice = createSlice({
  name: 'emailVerification',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default emailVerificationSlice.reducer;
