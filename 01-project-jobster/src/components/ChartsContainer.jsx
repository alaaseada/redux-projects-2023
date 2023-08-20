import { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { JobsAreaChart, JobsBarChart } from '../components';
import { useSelector } from 'react-redux';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(false);
  const { monthlyApplications } = useSelector((store) => store.allJobs);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>

      {barChart ? (
        <JobsBarChart data={monthlyApplications} />
      ) : (
        <JobsAreaChart data={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
