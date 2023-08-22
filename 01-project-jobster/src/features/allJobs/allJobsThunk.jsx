import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { logoutUser } from '../user/userSlice';
import { clearState } from '../allJobs/allJobsSlice';
import { clearValues } from '../job/jobSlice';

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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getJobStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearAllStateValuesThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser('Logging out'));
    thunkAPI.dispatch(clearState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};
