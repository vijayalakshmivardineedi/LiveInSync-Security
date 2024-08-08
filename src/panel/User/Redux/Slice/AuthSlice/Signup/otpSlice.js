// otpSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyOTP = createAsyncThunk(
    'otpVerification/verifyOTP',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://192.168.29.226:2000/api/user/VerifyUserProfile`, { email, otp });
            console.log(response.data)
            return response.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    loading: false,
    error: null,
    verificationStatus: false,
    data: []
};

const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        verifyOTPSuccess(state) {
            state.loading = false;
            state.error = null;
            state.verificationStatus = true;
        },
        verifyOTPFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.verificationStatus = false;
        },
        resetVerification(state) {
            state.loading = false;
            state.error = null;
            state.verificationStatus = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOTP.pending, (state) => {
                console.log('Verify OTP pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                console.log('slice  code Verify OTP fulfilled:', action.payload);
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                state.verificationStatus = true;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                console.log('Verify OTP rejected:', action.payload);
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { verifyOTPSuccess, verifyOTPFailure, resetVerification } = otpSlice.actions;

export const selectLoadingStatus = (state) => state.otp.loading;
export const selectError = (state) => state.otp.error;
export const selectVerificationStatus = (state) => state.otp.verificationStatus;

export default otpSlice.reducer;