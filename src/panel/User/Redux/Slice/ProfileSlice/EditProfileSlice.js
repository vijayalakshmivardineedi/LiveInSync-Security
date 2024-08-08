import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const EditUserProfile = createAsyncThunk(
  'profiles/EditUserProfile',
  async (updatedProfile, thunkAPI) => {
    const id = updatedProfile.id;
    console.log(id)
    try {
      const response = await axios.put(`http://192.168.29.226:2000/api/user/updateUserProfile/${id}`, updatedProfile);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const profileEditSlice = createSlice({
  name: 'profileEdit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EditUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(EditUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.profiles = action.payload;
      })
      .addCase(EditUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileEditSlice.reducer;