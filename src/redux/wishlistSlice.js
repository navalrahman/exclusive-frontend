// src/features/user/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const wishlistAdd = createAsyncThunk(
    'wishlist/add',
    async (productId, thunkAPI) => {
        // console.log("productId", productId);

        try {

            // const state = thunkAPI.getState();
            // console.log("state", state);
            // const token = state?.user?.user?.token
            // console.log('token', token);

            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.post('http://localhost:5080/api/wishlist/addproduct', { productId }, config);
            // console.log('res', response);

            return response.data;
        } catch (error) {
            // console.log("errorinApi", error);

            // console.log("Error in wishlistAdd:", error);

            // Print detailed server-side error
            // if (error.response) {
            //     console.error("Backend Error:", error.response.data);
            // }

            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
);

export const wishlistitem = createAsyncThunk(
    'wishlist/fetch',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);
            if (!token) throw new Error("Token not found");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const res = await axios.get(
                'http://localhost:5080/api/wishlist/getwishlistproduct',
                config
            );

            // console.log('res', res.data);
            return res.data.wishlistItem;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || 'Failed to fetch wishlist products'
            );
        }
    }
);


export const wishlistDelete = createAsyncThunk(
    'wishlist/delete',
    async (id, thunkAPI) => {


        try {
            console.log("id", id);
            const token = localStorage.getItem('token');
            console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.delete(`http://localhost:5080/api/wishlist/deleteproduct/${id}`, config);
            console.log('res', response);

            return response.data;
        } catch (error) {
            console.log("errorinApi", error);

            console.log("Error in wishlistAdd:", error);

            // Print detailed server-side error
            if (error.response) {
                console.error("Backend Error:", error.response.data);
            }

            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
);


const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        wishlist: [],
        // singleProduct: null,
        loading: false,
        error: null,
        //  lastFetched: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(wishlistAdd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(wishlistAdd.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(wishlistAdd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // 

            .addCase(wishlistitem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(wishlistitem.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload; // ✅ Fixed key
            })
            .addCase(wishlistitem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(wishlistDelete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(wishlistDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload; // ✅ Fixed key
            })
            .addCase(wishlistDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default wishlistSlice.reducer;
