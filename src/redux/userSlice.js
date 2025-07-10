// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => {
    try {
      // const res = await axios.post()
      const res = await axios.post('http://localhost:5080/api/user/signup', userData);
      // console.log("res", res);
      // localStorage.setItem('user', res.data.data)
      return res.data
    } catch (error) {
      // console.log('error', error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
)


export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      // const res = await axios.post()
      const res = await axios.post('http://localhost:5080/api/user/login', userData);
      console.log("res", res);
      // localStorage.setItem('token', res.data.data.token)

      if (res.data?.success === false) {
        return thunkAPI.rejectWithValue(res.data.message || 'Registration failed');
      }
      return res.data
    } catch (error) {
      // console.log('error', error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
)




export const userDetails = createAsyncThunk(
  'user/fetch',
  async (_, thunkAPI) => {
    try {
      // const res = await axios.post()
      const token = localStorage.getItem('token');
      // console.log('token from localStorage:', token);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'

        },
      };
      const res = await axios.get('http://localhost:5080/api/user/details', config);
      // console.log("res", res);
      // localStorage.setItem('token', res.data.data.token)

      if (res.data?.success === false) {
        return thunkAPI.rejectWithValue(res.data.message || 'Registration failed');
      }
      return res.data
    } catch (error) {
      // console.log('error', error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
)



export const userDetailsUpdate = createAsyncThunk(
  'user/fetch',
  async (formData, thunkAPI) => {
    try {
      console.log('formData',formData);
      
      const token = localStorage.getItem('token');
  

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'

        },
      };
      const res = await axios.put('http://localhost:5080/api/user/updatedetails',formData, config);
      console.log("res", res);
      // // localStorage.setItem('token', res.data.data.token)

      if (res.data?.success === false) {
        return thunkAPI.rejectWithValue(res.data.message || 'Registration failed');
      }
      return res.data
    } catch (error) {
      console.log('error', error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
)


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,       // ✅ valid initial state
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;