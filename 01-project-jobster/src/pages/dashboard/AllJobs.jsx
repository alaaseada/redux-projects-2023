import { getAllJobs } from '../../features/job/jobSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JobList } from '../../components';
import SearchForm from '../../components/SearchForm';

const AllJobs = () => {
  const { jobList, isLoading } = useSelector((store) => store.jobs);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  useEffect(() => {
    setJobs(jobList);
  }, [jobList]);

  const filterJobs = ({ ...filters }) => {};

  return (
    <>
      <SearchForm filterFn={filterJobs} />
      {isLoading ? <div className='loading'></div> : <JobList jobs={jobs} />}
    </>
  );
};
export default AllJobs;
