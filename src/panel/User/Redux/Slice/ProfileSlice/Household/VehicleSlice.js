import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const addVehicleAsync = createAsyncThunk(
    'houseHolds/addVehicle',
    async (updatedProfile, thunkAPI) => {
        const { societyId, userId, vehicleData } = updatedProfile;
        try {
            const response = await axios.post(
                `http://192.168.29.226:2000/api/addVehicle/${societyId}/${userId}`,
                vehicleData
            );
            console.log(response.data)
            return response.data.userProfiles;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const deleteVehicleAsync = createAsyncThunk(
    'houseHolds/deleteVehicle',
    async ({ societyId, userId, id }, thunkAPI) => {
        console.log(societyId, userId, id)
        try {
            const response = await axios.delete(
                `http://192.168.29.226:2000/api/deleteVehicle/${societyId}/${userId}/${id}`
            );
            return response.data.userProfiles;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
const initialState = {
    vehicleData: [],
    status: 'idle',
    error: null,
}
const addVehicleSlice = createSlice({
    name: 'addFamilyMember',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addVehicleAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addVehicleAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                // state.data.push(action.payload);
            })
            .addCase(addVehicleAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteVehicleAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteVehicleAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                // state.data = action.payload;
            })
            .addCase(deleteVehicleAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default addVehicleSlice.reducer;
