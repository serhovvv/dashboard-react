import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:5000/products"

export const fetchProducts = createAsyncThunk("products/fetchItems", async (_,thunkAPI)=>{
    try{
        const response = await axios.get(BASE_URL)
    return response.data
    } catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Lost Server Connection")
    }
})

export const addProducts = createAsyncThunk("products/addItems", async (newItem, thunkAPI)=>{
    try {
        const response = await axios.post(BASE_URL, newItem)
    return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown error")
    }
})

export const deleteProducts = createAsyncThunk("products/deleteProducts", async (ids)=>{
    await Promise.all(
        ids.map((id)=> axios.delete(`${BASE_URL}/${id}`))
    )
    return ids
})

const initialState = {
    products: [],
    err: null,
    searchTerm: "",
    filteredProducts: [],
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            state.filteredProducts = state.products.filter((product) =>
                product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
            );
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.fulfilled, (state, action) =>{state.products = action.payload} )
        .addCase(fetchProducts.pending, (state) =>{state.err = null} )
        .addCase(fetchProducts.rejected, (state, action) =>{state.err = action.payload} )
        .addCase(addProducts.fulfilled, (state, action) =>{state.products.push(action.payload)} )
        .addCase(addProducts.pending, (state) =>{state.err = null} )
        .addCase(addProducts.rejected, (state, action) =>{state.err = action.payload} )
        .addCase(deleteProducts.fulfilled,(state,action) =>{state.products = state.products.filter((item)=>!action.payload.includes(item.id))} )
    }

})

export default productSlice.reducer
export const { setSearchTerm } = productSlice.actions
