
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const forgotPasswordStart = createAsyncThunk(
  "auth/forgotPasswordStart",
  async ({ phoneNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.29.226:2000/api/Forgetpassword",
        { phoneNumber }
      );
      return response.data;
      
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordStart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordStart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(forgotPasswordStart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default forgotPasswordSlice.reducer;