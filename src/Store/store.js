import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feautures/auth/AuthSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})