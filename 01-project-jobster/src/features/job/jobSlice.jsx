import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addJobThunk, deleteJobThunk, editJobThunk } from './jobThunks';
import { getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  isEditing: false,
  position: '',
  company: '',
  status: 'pending',
  jobLocation: '',
  jobType: 'full-time',
  jobEditId: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobStatusOptions: ['pending', 'interview', 'declined'],
};

export const addNewJob = createAsyncThunk('jobs/addNewJob', addJobThunk);
export const deleteJob = createAsyncThunk('jobs/deleteJob', deleteJobThunk);
export const editJob = createAsyncThunk('jobs/editJob', editJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleJobInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job added.');
      })
      .addCase(addNewJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job deleted.');
      })
      .addCase(deleteJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Job updated.');
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleJobInput, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
