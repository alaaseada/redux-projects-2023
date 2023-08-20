import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobStats } from '../features/allJobs/allJobsSlice';
import Loading from './Loading';
import StatsContainer from './StatsContainer';
import ChartsContainer from './ChartsContainer';

const Statistics = () => {
  const { monthlyApplications, isLoading } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobStats());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading center />
      ) : (
        <>
          <StatsContainer />
          {monthlyApplications?.length > 0 && <ChartsContainer />}
        </>
      )}
    </>
  );
};

export default Statistics;
