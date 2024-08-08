// src/redux/passwordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk to fetch data from the backend
export const fetchUserData = createAsyncThunk(
    'password/fetchUserData',
    async (userData,  { rejectWithValue }) => {
        try {
            const response = await axios.post('http://192.168.29.226:2000/api/user/resetPassword', userData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

const passwordSlice = createSlice({
    name: 'password',
    initialState: {
        currentPassword: '',
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentPassword = action.payload.currentPassword;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default passwordSlice.reducer;
