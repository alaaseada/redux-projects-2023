import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from 'axios';

const registration_url =
  'https://jobify-prod.herokuapp.com/api/v1/toolkit/auth/register';

const initialState = {
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(registration_url, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('i am here to login the user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = { ...action.payload.user };
          toast.success('User has been successfully created.');
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
