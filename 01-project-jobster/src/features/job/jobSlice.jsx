import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';

const initialState = {
  isLoading: false,
  job: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    sayHi: (state, action) => {
      console.log('Hi');
    },
  },
});

export default jobSlice.reducer;
