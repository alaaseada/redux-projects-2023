import authHeader from '../../utils/authHeader';
import customFetch from '../../utils/axios';
import { logoutUser } from '../user/userSlice';

export const getAllJobsThunk = async (thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs', authHeader(thunkAPI));
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('Authentication Failed. Logging out...');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
