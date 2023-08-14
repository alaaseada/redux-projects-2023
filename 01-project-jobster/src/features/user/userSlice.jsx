import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import {
  storeUserInLocalStorage,
  getUserFromLocalStorage,
} from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post(`/auth/register`, user);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post(`/auth/login`, user);
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        storeUserInLocalStorage(action.payload.user);
        toast.success('User has been successfully created.');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.isLoading = false;
        state.user = user;
        storeUserInLocalStorage(user);
        toast.success(`Welcome, ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        toast.error(action.payload);
      });
  },
});

export const { toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
