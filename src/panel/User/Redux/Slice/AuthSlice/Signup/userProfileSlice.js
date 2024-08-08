// userProfileSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async ({ id, data }, { rejectWithValue }) => {
    console.log("data", data)
    try {
      const response = await axios.put(`http://192.168.29.226:2000/api/user/createUserProfile/${id}`, data)
      return response.data.userProfile;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);

const initialState = {
  userProfile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.userProfile = null;
      state.loading = false;
      state.error = null;
    },
    // Add additional reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
        console.log("slice", state.userProfile)
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
