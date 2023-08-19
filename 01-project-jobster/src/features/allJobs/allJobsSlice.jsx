import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllJobsThunk } from './allJobsThunk';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
};

export const getAllJobs = createAsyncThunk(
  'jobs/getAllJobs',
  async (_, thunkAPI) => {
    return getAllJobsThunk(thunkAPI);
  }
);
const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllJobs.fulfilled,
        (state, { payload: { jobs, totalJobs, numOfPages } }) => {
          state.isLoading = false;
          state.jobs = jobs;
          state.totalJobs = totalJobs;
          state.numOfPages = numOfPages;
        }
      )
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { showLoading, hideLoading } = allJobsSlice.actions;
export default allJobsSlice.reducer;
