import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
    'cart/add',
    async (productId, thunkAPI) => {
        console.log(productId);

        try {

            const token = localStorage.getItem('token');
            // console.log('token from localStorage:', token);

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
            };
            const response = await axios.post('http://localhost:5080/api/cart/addtocart', { productId }, config);
            console.log('res', response);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
)

export const cartItems = createAsyncThunk(
    'cart/fetch',
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
            const response = await axios.get(
                'http://localhost:5080/api/cart/cartitems',
                config
            );
            // console.log('res', response);

            return response.data.cartItems;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || 'Failed to fetch products'
            );
        }
    }
)

// Increment Quantity
export const incrementQuantity = createAsyncThunk(
  'cart/incrementQuantity',
  async (productId, thunkAPI) => {
    console.log(productId);
    

    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://localhost:5080/api/cart/increment/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed');
    }
  }
);

// Decrement Quantity
export const decrementQuantity = createAsyncThunk(
  'cart/decrementQuantity',
  async (productId, thunkAPI) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://localhost:5080/api/cart/decrement/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed');
    }
  }
);



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        // cart: {
        //     products: [],
        // },
        cartLength : null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false,
                    state.cart = action.payload
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })

            .addCase(cartItems.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(cartItems.fulfilled, (state, action) => {
                state.loading = false,
                    state.cart = action.payload
                    //  console.log("payload",action.payload.products.length || 0) ;
                    state.cartLength = action.payload
            })
            .addCase(cartItems.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }

})

export default cartSlice.reducer