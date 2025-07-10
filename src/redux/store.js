// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../features/cart/cartSlice';
// import productsReducer from '../features/products/productsSlice';
// import userReducer from '../features/user/userSlice';


import userReducer from './userSlice'
import cartReducer from './cartSlice'
import productReducer from './productSlice'
import wishlistReducer from './wishlistSlice';
import billReducer from './billingSlice';
import addressReducer from './addressSlice';

export const store = configureStore({
  reducer: {
    address: addressReducer,
    cart: cartReducer,
    bill: billReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});
