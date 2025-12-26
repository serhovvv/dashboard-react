import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:5000/categories"

export const fetchCategories = createAsyncThunk("categories/fetchItems", async (_,thunkAPI)=>{
    try{
        const response = await axios.get(BASE_URL)
    return response.data
    } catch(err){
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Lost Server Connection")
    }
})

export const addCategories = createAsyncThunk("categories/addItems", async (newItem, thunkAPI)=>{
    try {
        const response = await axios.post(BASE_URL, newItem)
    return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown error")
    }
})

export const deleteCategories = createAsyncThunk("categories/deleteCategories", async (id)=>{
    const response = await axios.delete(`${BASE_URL}/${id}`)
    return id
})

const initialState = {
    categories: [],
    filterCategory: [],
    err: null
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
         setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },  
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.fulfilled, (state, action) =>{state.categories = action.payload} )
        .addCase(fetchCategories.pending, (state) =>{state.err = null} )
        .addCase(fetchCategories.rejected, (state, action) =>{state.err = action.payload} )
        .addCase(addCategories.fulfilled, (state, action) =>{state.categories.push(action.payload)} )
        .addCase(addCategories.pending, (state) =>{state.err = null} )
        .addCase(addCategories.rejected, (state, action) =>{state.err = action.payload} )
        .addCase(deleteCategories.fulfilled,(state,action) =>{state.categories = state.categories.filter((item)=>!action.payload.includes(item.id))} )
    }

})

export default categoriesSlice.reducer
export const {setFilterCategory} = categoriesSlice.actions