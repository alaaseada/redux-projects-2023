import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/user/userSlice';
import jobsReducer from './features/job/jobSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    jobs: jobsReducer,
  },
});

export default store;
