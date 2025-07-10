// src/features/user/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const productsList = createAsyncThunk(
  'product/fetch',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:5080/api/exclusive/products');
      // console.log('res', res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);


export const productitem = createAsyncThunk(
  'product/fetchOne',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:5080/api/exclusive/product/${id}`);
      // console.log('res', res.data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    singleProduct: null,
    loading: false,
    error: null,
     lastFetched: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productsList.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload; // ✅ Fixed key
      })
      .addCase(productsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 

      .addCase(productitem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productitem.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload; // ✅ Fixed key
      })
      .addCase(productitem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default productSlice.reducer;
