import Wrapper from '../assets/wrappers/JobsContainer';
import { Job } from '../components';
import { useSelector } from 'react-redux';

const JobList = ({ jobs }) => {
  const { totalJobs } = useSelector((store) => store.allJobs);
  return (
    <Wrapper>
      <h5>{totalJobs} Jobs Found</h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobList;
