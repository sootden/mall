import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCartItems, postChangeCart} from "../api/cartApi";

export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync', (param) => {
    return getCartItems(param);
});

export const postChangeCartAsync = createAsyncThunk('postChangeCartAsync', (param) => {
    return postChangeCart(param);
});

const initState = []

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: initState,
    extraReducers: (builder) => {
        builder
            .addCase(
                getCartItemsAsync.fulfilled, (state, action) => {
                    console.log("getCartItemsAsync fulfilled");
                    return action.payload;
                }
            )
            .addCase(
                postChangeCartAsync.fulfilled, (state, action)=>{
                    console.log("postChangeCartAsync fulfilled");
                    return action.payload;
                }
            )
    }
})

export default cartSlice.reducer;