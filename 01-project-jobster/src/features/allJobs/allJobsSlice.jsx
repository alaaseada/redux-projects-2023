import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  clearAllStateValuesThunk,
  getAllJobsThunk,
  getJobStatsThunk,
} from './allJobsThunk';
import { toast } from 'react-toastify';

const initialSearchCriteria = {
  search: '',
  searchJobType: 'all',
  searchJobStatus: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialSearchCriteria,
};

export const getAllJobs = createAsyncThunk('jobs/getAllJobs', getAllJobsThunk);

export const getJobStats = createAsyncThunk(
  'jobs/getJobStats',
  getJobStatsThunk
);

export const clearAllStateValues = createAsyncThunk(
  '/jobs/clearAllStateValues',
  clearAllStateValuesThunk
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
    setSearchCriteria: (state, { payload: { name, value } }) => {
      state[name] = value;
      state.page = 1;
    },
    clearSearchCriteria: (state) => {
      return { ...state, ...initialSearchCriteria, page: 1 };
    },
    handlePage: (state, { payload }) => {
      return { ...state, page: payload };
    },
    clearState: (state) => {
      return { ...initialState };
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
      })
      .addCase(getJobStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(getJobStats.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(clearAllStateValues.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  setSearchCriteria,
  clearSearchCriteria,
  handlePage,
  clearState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
