import { useDispatch, useSelector } from 'react-redux';
import { JobList, Loading } from '../../components';
import { useEffect } from 'react';
import { getAllJobs } from '../../features/allJobs/allJobsSlice';

const AllJobs = () => {
  const { isLoading, jobs } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading center={true} />
      ) : jobs.length ? (
        <JobList jobs={jobs} />
      ) : (
        <h3>No jobs to display</h3>
      )}
    </>
  );
};
export default AllJobs;
