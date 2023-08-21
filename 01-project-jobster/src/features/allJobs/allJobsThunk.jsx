import authHeader from '../../utils/authHeader';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';

export const getAllJobsThunk = async (_, thunkAPI) => {
  try {
    const { search, sort, searchJobType, searchJobStatus, page } =
      thunkAPI.getState().allJobs;
    let url = `/jobs?sort=${sort}&page=${page}`;
    if (search) url += `&search=${search}`;
    if (searchJobStatus !== 'all') url += `&status=${searchJobStatus}`;
    if (searchJobType !== 'all') url += `&jobType=${searchJobType}`;
    const response = await customFetch.get(url);
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authentication Failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getJobStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authentication Failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
