import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/user/userSlice';
import jobsReducer from './features/job/jobSlice';
import allJobsReducer from './features/allJobs/allJobsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    jobs: jobsReducer,
    allJobs: allJobsReducer,
  },
});

export default store;
