import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addNewJobThunk, getAllJobsThunk } from './jobThunks';
import { toast } from 'react-toastify';

const initialState = {
  isLoading: false,
  job: {
    position: '',
    company: '',
    jobLocation: '',
    status: '',
    jobType: '',
  },
  jobList: [],
};

export const addNewJob = createAsyncThunk(
  'jobs/addNewJob',
  async (job, thunkAPI) => {
    return addNewJobThunk(job, thunkAPI);
  }
);

export const getAllJobs = createAsyncThunk(
  'jobs/getAllJobs',
  async (_, thunkAPI) => {
    return getAllJobsThunk(thunkAPI);
  }
);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    submitJob: (state, action) => {
      state.job = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewJob.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.job = action.payload;
        toast.success('The job has been added successfully.');
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      })
      .addCase(getAllJobs.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobList = action.payload.jobs;
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload);
      });
  },
});

export const { submitJob } = jobSlice.actions;
export default jobSlice.reducer;
