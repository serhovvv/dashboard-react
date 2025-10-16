import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || undefined,
    isLoading: false,
    err: null
}

export const login = createAsyncThunk("auth/login", async (userData,thunkAPI) => {
    try{
        const response = await axios.post("https://reqres.in/api/login", userData, {
            headers: {
            "Content-Type": "application/json",
            "x-api-key": "reqres-free-v1"
          }

        });
        return response.data 
    }catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown error")
    }
}
);

const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.isLoading = true;
            state.err = null;
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload))
        })
        .addCase(login.rejected,(state,action) => {
            state.isLoading = false;
            state.err = action.payload;
        })
    }
});

export default authSlice.reducer;