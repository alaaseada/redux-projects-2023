import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

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
      const response = await customFetch.patch('/auth/updateUser', user);
      return response.data;
    } catch (error) {
      return checkForUnauthorizedResponse(error, thunkAPI);
    }
  }
);
