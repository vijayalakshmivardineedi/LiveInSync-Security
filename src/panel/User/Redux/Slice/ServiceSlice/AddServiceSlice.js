// src/Redux/Slice/ServiceSlice/addServiceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addService = createAsyncThunk('services/addService', async (serviceData) => {
    console.log(serviceData);
  const response = await axios.put('http://192.168.29.226:2000/api/addList', serviceData);
  return response.data;
});

const addServiceSlice = createSlice({
  name: 'addService',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default addServiceSlice.reducer;
