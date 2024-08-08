
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const verifyForgotOTP = createAsyncThunk(
    'forgotOtpVerification/verifyForgotOTP',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://192.168.29.226:2000/api/user/verifyForgotVerificationOTP`, { email, otp });
            console.log(response.data);
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

const forgototpSlice = createSlice({
    name: 'forgotOtpVerification',
    initialState,
    reducers: {
        forgotOtpVerificationSuccess(state) {
            state.loading = false;
            state.error = null;
            state.verificationStatus = true;
        },
        forgotOtpVerificationFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.verificationStatus = false;
        },
        resetForgotOtpVerification(state) {
            state.loading = false;
            state.error = null;
            state.verificationStatus = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyForgotOTP.pending, (state) => {
                console.log('Verify OTP pending...');
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyForgotOTP.fulfilled, (state, action) => {
                console.log('Verify OTP fulfilled:', action.payload);
                state.loading = false;
                state.data = action.payload;
                state.error = null;
                state.verificationStatus = true;
            })
            .addCase(verifyForgotOTP.rejected, (state, action) => {
                console.log('Verify OTP rejected:', action.payload);
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { forgotOtpVerificationSuccess, forgotOtpVerificationFailure, resetForgotOtpVerification } = forgototpSlice.actions;

export default forgototpSlice.reducer;
