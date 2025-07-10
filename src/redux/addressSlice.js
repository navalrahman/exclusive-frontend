import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const addresses = createAsyncThunk(
    'address/fetch',
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
            const response = await axios.get('http://localhost:5080/api/address/useraddress', config);
            console.log('responsesss', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
)



export const addAddress = createAsyncThunk(
    'address/add',
    async (data, thunkAPI) => {
        try {

            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.post('http://localhost:5080/api/address/addaddress',  data , config);
            console.log('responsesss', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
)


export const deleteAddress = createAsyncThunk(
    'address/delete',
    async (data, thunkAPI) => {
        try {

            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.delete(`http://localhost:5080/api/address/deleteaddress/${data}` , config);
            console.log('responsesss', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to delete address'
            );
        }
    }
)



export const updateAddress = createAsyncThunk(
    'address/update',
    async (data, thunkAPI) => {
        try {
            console.log("id-data", data);
            
            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.put(`http://localhost:5080/api/address/updateaddress/${data.id}`, data, config);
            console.log('responsesss', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to delete address'
            );
        }
    }
)



const addressSlice = createSlice({
    name: 'address',
    initialState: {
        address: [],
        // cart: {
        //     products: [],
        // },
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addresses.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(addresses.fulfilled, (state, action) => {
                state.loading = false,
                    state.address = action.payload
            })
            .addCase(addresses.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            
            .addCase(addAddress.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false,
                    state.address = action.payload
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

    }

})

export default addressSlice.reducer