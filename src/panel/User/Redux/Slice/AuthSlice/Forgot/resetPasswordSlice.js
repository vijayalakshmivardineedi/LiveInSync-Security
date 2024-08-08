// updatePasswordSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to update user's password
export const updatePassword = createAsyncThunk(
  'updatePassword/updatePassword',
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://192.168.29.226:2000/api/user/updatePassword', {
        email,
        newPassword,
      });
      return response.data.message; // Assuming your backend sends a message upon success
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: '',
};

const updatePasswordSlice = createSlice({
  name: 'updatePassword',
  initialState,
  reducers: {
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = '';
    },
    // Add additional reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = '';
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Store success message from backend
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = '';
      });
  },
});

export const { clearStatus } = updatePasswordSlice.actions;

export default updatePasswordSlice.reducer;
