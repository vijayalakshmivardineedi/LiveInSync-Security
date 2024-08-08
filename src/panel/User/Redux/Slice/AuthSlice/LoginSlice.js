import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export const loginStart = createAsyncThunk(
  "auth/loginStart",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.29.226:2000/api/Resident/SignIn",
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginStart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStart.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        AsyncStorage.setItem('userId', action.payload.user._id);
      })
      .addCase(loginStart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
