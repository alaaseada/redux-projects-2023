import React from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { Job } from '../components';

const JobList = ({ jobs }) => {
  return (
    <Wrapper>
      <h5>{jobs.length} Jobs Found</h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobList;
