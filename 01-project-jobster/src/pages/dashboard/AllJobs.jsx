import { useDispatch, useSelector } from 'react-redux';
import {
  JobList,
  Loading,
  SearchForm,
  PageBtnContainer,
} from '../../components';
import { useEffect } from 'react';
import { getAllJobs } from '../../features/allJobs/allJobsSlice';

const AllJobs = () => {
  const {
    isLoading,
    jobs,
    search,
    sort,
    searchJobType,
    searchJobStatus,
    page,
    numOfPages,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllJobs());
  }, [search, sort, searchJobType, searchJobStatus, page]);

  return (
    <>
      <SearchForm />
      {isLoading ? (
        <Loading center={true} />
      ) : jobs.length ? (
        <>
          <JobList jobs={jobs} />
          {numOfPages > 1 && <PageBtnContainer />}
        </>
      ) : (
        <h3>No jobs to display</h3>
      )}
    </>
  );
};
export default AllJobs;
