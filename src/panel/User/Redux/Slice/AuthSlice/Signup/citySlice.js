import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCities = createAsyncThunk('cities/fetchCities', async () => {
    const response = await fetch('http://192.168.29.226:2000/api/getAllCities');
    if (!response.ok) {
        throw new Error('Failed to fetch cities');
    }
    const cities = await response.json();
    return cities;
});


const citySlice = createSlice({
    name: 'cities',
    initialState: {
        cities: [],
        status: 'idle', 
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCities.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cities = action.payload.cities;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});





export default citySlice.reducer;

