import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from '../../../../Security/helpers/axios';

// Async thunk for fetching user profiles
export const fetchVisitorVerify = createAsyncThunk(
  "visitorVerify/fetchVisitorVerify",
  async (payload) => {
    const { societyId, id, visitorType } = payload;
    console.log(societyId, id, visitorType);

    const endpoint = visitorType === 'Guest' ? 'checkInVisitor' : 'checkInStaff';
    let response;
    response = await axiosInstance.post(`/${endpoint}`, {
          societyId,
          id
        });
        
    // if (visitorType === 'Guest') {
    //   response = await axiosInstance.put(`/${endpoint}`, {
    //     societyId,
    //     id
    //   });
    // } else {
    //   response = await axiosInstance.post(`/${endpoint}`, {
    //     societyId,
    //     id
    //   });
    // }

    return response.data;
  }
);


const visitorVerifySlice = createSlice({
  name: "visitorVerify",
  initialState: {
    visitorVerify: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitorVirify.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVisitorVirify.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitorVerify = action.payload.userProfiles;
      })
      .addCase(fetchVisitorVirify.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default visitorVerifySlice.reducer;