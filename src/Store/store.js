import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feautures/auth/authSlice";
import productReducer from "../feautures/products/productSlice"
import categoryReducer from "../feautures/categories/categoriesSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products:productReducer,
        categories:categoryReducer,
    }
})