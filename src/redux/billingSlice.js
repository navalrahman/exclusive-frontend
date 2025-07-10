import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const billingitem = createAsyncThunk(
    'bill/add',
    async (billingItems, thunkAPI) => {
        console.log('billingItems', billingItems);

        try {

            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.post('http://localhost:5080/api/bill/billing', { billingItems }, config);
            console.log('res', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
)


export const getTheOrders = createAsyncThunk(
    "bill/fetch",
    async (_, thunkAPI) => {
        try {

            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.get('http://localhost:5080/api/bill/orders', config);
            console.log('res', response);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
)


const billingSlice = createSlice({
    name: 'bill',
    initialState: {
        bill: [],
        // cart: {
        //     products: [],
        // },
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(billingitem.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(billingitem.fulfilled, (state, action) => {
                state.loading = false,
                    state.bill = action.payload
            })
            .addCase(billingitem.rejected, (state, action) => {
                state.loading = false,
                    state.bill = action.payload
            })

            .addCase(getTheOrders.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(getTheOrders.fulfilled, (state, action) => {
                state.loading = false,
                    state.bill = action.payload
            })
            .addCase(getTheOrders.rejected, (state, action) => {
                state.loading = false,
                    state.bill = action.payload
            })

    }

})

export default billingSlice.reducer