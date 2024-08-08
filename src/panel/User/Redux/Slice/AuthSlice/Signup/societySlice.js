import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//getSocieties
// export const fetchSocieties = createAsyncThunk('societies/fetchSocieties', async () => {
//     const response = await fetch('http://192.168.29.226:2000/api/society/6686a28e216e361f307b8598');
//     if (!response.ok) {
//         throw new Error('Failed to fetch societies');
//     }
//     const societies = await response.json();

//     return societies;
// });
export const fetchSocieties = createAsyncThunk('societies/fetchSocieties', async (selectedCity) => {
    const response = await fetch(`http://192.168.29.226:2000/api/society/${selectedCity}`);
    if (!response.ok) {
        throw new Error('Failed to fetch societies');
    }
    const societies = await response.json();

    return societies;
});



const societySlice = createSlice({
    name: 'societies',
    initialState: {
        societies: [],
        status: 'idle', 
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSocieties.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSocieties.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.societies = action.payload.societies;
            })
            .addCase(fetchSocieties.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default societySlice.reducer;