import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  contacts: [],
  status: 'idle',
  error: null,
};

// Define thunk to fetch emergency contacts from backend
export const fetchEmergencyContacts = createAsyncThunk(
  'emergencyContacts/fetchContacts',
  async () => {
    try {
      // Replace with actual API call to fetch data
      const response = await fetch('http://192.168.29.226:2000/api/getEmergencyContactBySocietyId/668293f21cfb117dbcbee3c8');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Create slice for emergency contacts
const emergencyContactsSlice = createSlice({
  name: 'emergencyContacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmergencyContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmergencyContacts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchEmergencyContacts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default emergencyContactsSlice.reducer;
