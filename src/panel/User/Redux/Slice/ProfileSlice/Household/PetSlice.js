import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addPetAsync = createAsyncThunk(
    'houseHolds/addPet',
    async (updatedProfile, thunkAPI) => {
        const { societyId, userId, petData } = updatedProfile;
        try {
            const response = await axios.post(
                `http://192.168.29.226:2000/api/addPet/${societyId}/${userId}`,
                petData
            );
            return response.data.userProfiles;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deletePetAsync = createAsyncThunk(
    'houseHolds/deletePet',
    async ({ societyId, userId, id }, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://192.168.29.226:2000/api/deletePet/${societyId}/${userId}/${id}`
            );
            return response.data.userProfiles;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    pets: [], // Changed to plural to better represent the array of pets
    status: 'idle',
    error: null,
};

const addPetSlice = createSlice({
    name: 'AddPets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPetAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addPetAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;

            })
            .addCase(addPetAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deletePetAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deletePetAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
                state.pets = action.payload;
            })
            .addCase(deletePetAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default addPetSlice.reducer;
