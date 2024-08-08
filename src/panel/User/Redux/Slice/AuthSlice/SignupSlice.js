import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://192.168.29.226:2000/api/user/createUserProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error);
      }

      const data = await response.json();
      console.log("Signup user data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for email verification
export const emailVerificationAsync = createAsyncThunk(
  "auth/emailVerification",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://192.168.29.226:2000/api/user/sendVerificationEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error);
      }

      const data = await response.json();
      console.log("Email verification data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Combined slice for user signup and email verification
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    signupError: null,
    verificationError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for signupUser async thunk
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signupError = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        console.log("Signup user success:", state.user);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupError = action.payload;
        console.error("Signup user error:", action.payload);
      })
      // Reducers for emailVerificationAsync async thunk
      .addCase(emailVerificationAsync.pending, (state) => {
        state.loading = true;
        state.verificationError = null;
      })
      .addCase(emailVerificationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.verificationError = "";
        console.log("Email verification success:", state.user);
      })
      .addCase(emailVerificationAsync.rejected, (state, action) => {
        state.loading = false;
        state.verificationError = action.payload;
        console.error("Email verification error:", action.payload);
      });
  },
});

export default authSlice.reducer;
