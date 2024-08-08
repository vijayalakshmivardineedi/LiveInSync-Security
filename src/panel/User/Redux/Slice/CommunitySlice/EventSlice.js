import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    events: [],
    status: "idle",
    error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
    const response = await axios.get(
        "http://192.168.29.226:2000/api/getEventById/614cc0b77c53f402cc3587jk"
    );
    return response.data;
});

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default eventsSlice.reducer;