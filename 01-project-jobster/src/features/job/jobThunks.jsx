import customFetch from '../../utils/axios';
import authHeader from '../../utils/authHeader';
import { logoutUser } from '../user/userSlice';

export const addNewJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', job, authHeader(thunkAPI));
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authorization failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getAllJobsThunk = async (thunkAPI) => {
  try {
    const response = await customFetch.get(`/jobs`, authHeader(thunkAPI));
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authorization failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
