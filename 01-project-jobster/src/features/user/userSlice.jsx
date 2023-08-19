import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  storeUserInLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage';
import { registerUser, loginUser, UpdateUser } from './userThunks';

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) toast.success(payload);
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
      })
      .addCase(UpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.isLoading = false;
        state.user = user;
        storeUserInLocalStorage(user);
        toast.success('Your data has been successfully updated');
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
