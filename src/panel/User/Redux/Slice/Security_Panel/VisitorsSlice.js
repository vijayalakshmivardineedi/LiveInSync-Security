import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../Security/helpers/axios';

// Define the createAsyncThunk action
export const createVisitor = createAsyncThunk(
  'visitor/createVisitor',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/createVisitors', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create the slice
const visitorSlice = createSlice({
  name: 'visitor',
  initialState: {
    visitor: [],
    loading: false,
    error: null,
    success: false,
    successMessage: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = null; // Ensure successMessage is also reset
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVisitor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createVisitor.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.success = true;
      })
      .addCase(createVisitor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetState } = visitorSlice.actions;
export default visitorSlice.reducer;
