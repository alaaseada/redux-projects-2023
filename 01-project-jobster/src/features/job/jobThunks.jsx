import customFetch from '../../utils/axios';
import authHeader from '../../utils/authHeader';
import { clearValues } from './jobSlice';
import { logoutUser } from '../user/userSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

export const addJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authentication failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (id, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const response = await customFetch.delete(`/jobs/${id}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    console.log(error);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authentication failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ id, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${id}`, job);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authentication failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
