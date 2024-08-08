import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://192.168.29.226:2000/api/user/userSignin",
                {
                    email,
                    password,
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.profile;
                state.token = action.payload.token;
                const { _id, name, role, societyId, userId, buildingName, flatNumber, societyName } = action.payload.profile;
                const userData = {
                    _id,
                    userId,
                    name,
                    role,
                    societyId, societyName,
                    buildingName, flatNumber
                };
                const userDataString = JSON.stringify(userData);
                AsyncStorage.setItem('user', userDataString)
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
