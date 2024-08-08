import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async () => {
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (!userJson) {
        throw new Error('User object not found in AsyncStorage');
      }
      const user = JSON.parse(userJson);
      const { societyId } = user;
      console.log(societyId)
      if (!societyId) {
        throw new Error('Society ID not found in user object');
      }
      const response = await axios.get(`http://192.168.29.226:2000/api/getAllServicePersons/${societyId}`);
      return response.data.service.society;
    } catch (error) {
      throw error;
    }
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
