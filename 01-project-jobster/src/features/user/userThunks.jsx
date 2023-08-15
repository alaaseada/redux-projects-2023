import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { logoutUser } from './userSlice';

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

export const UpdateUser = createAsyncThunk(
  'users/updateUser',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().users.user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());
        return thunkAPI.rejectWithValue('Unauthorized! Logging out...');
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
