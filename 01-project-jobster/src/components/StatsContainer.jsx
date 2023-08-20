import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatBlock from '../components/StatBlock';
import { FaBug, FaRegCalendarAlt, FaSuitcase } from 'react-icons/fa';
import { useEffect } from 'react';
import { getJobStats } from '../features/allJobs/allJobsSlice';

const StatsContainer = () => {
  const { stats } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const defaultStats = [
    {
      title: 'Pending applications',
      icon: <FaSuitcase />,
      count: stats.pending || 0,
      color: '#e9b949',
      bgColor: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      icon: <FaRegCalendarAlt />,
      count: stats.interview || 0,
      color: '#647acb',
      bgColor: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      icon: <FaBug />,
      count: stats.declined || 0,
      color: '#d66a6a',
      bgColor: '#ffeeee',
    },
  ];
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatBlock key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
