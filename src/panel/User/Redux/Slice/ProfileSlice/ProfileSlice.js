import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchUserProfiles = createAsyncThunk(
  'profiles/fetchUserProfiles',
  async ({userId, societyId}, thunkAPI) => {

    try {
      const response = await axios.get(`http://192.168.29.226:2000/api/user/getUserProfiles/${userId}/${societyId}`);

      return response.data.userProfiles;
   
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;

      })
      .addCase(fetchUserProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;