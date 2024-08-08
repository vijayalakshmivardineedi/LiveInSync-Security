// src/slices/serviceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  servicePerson: null,
  loading: false,
  error: null,
};

// Create async thunk for fetching service person data
export const fetchServicePerson = createAsyncThunk(
  'service/fetchServicePerson',
  async ({ societyId }) => {
    console.log(societyId)
    const response = await axios.get(`http://192.168.29.226:2000/api/getAllServicePersons/${societyId}`);
    console.log(response.data.service.society)
    return response.data;
  }
);

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicePerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePerson.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePerson = action.payload;
      })
      .addCase(fetchServicePerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
