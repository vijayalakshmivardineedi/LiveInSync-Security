// preApprovalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    preApprovals: [],
    status: 'idle',
    error: null,
};

export const fetchPreApprovals = createAsyncThunk(
    'preApprovals/fetchPreApprovals',
    async ({ societyId, block, flatNo }) => {
        console.log(societyId, block, flatNo)
        const response = await axios.get(`http://192.168.29.226:2000/api/getPreApprovedVisitors/${societyId}/${block}/${flatNo}`);
        return response.data.preApprovedVisitors;
    });

const preApprovalSlice = createSlice({
    name: 'preApprovals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPreApprovals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPreApprovals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.preApprovals = action.payload;
            })
            .addCase(fetchPreApprovals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default preApprovalSlice.reducer;
