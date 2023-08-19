import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { JobInfo } from '../components';
import { FaLocationArrow, FaRegCalendarAlt, FaSuitcase } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteJob, setEditJob } from '../features/job/jobSlice';

const Job = ({
  position,
  company,
  status,
  jobLocation,
  jobType,
  createdAt,
  _id,
}) => {
  const date = new Date(createdAt).toLocaleDateString('en-us', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
  const dispatch = useDispatch();

  const handleDeleteJob = () => {
    dispatch(deleteJob(_id));
  };

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{company[0]}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaRegCalendarAlt />} text={date} />
          <JobInfo icon={<FaSuitcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => {
                dispatch(
                  setEditJob({
                    jobEditId: _id,
                    company,
                    status,
                    position,
                    jobType,
                    jobLocation,
                  })
                );
              }}
            >
              Edit
            </Link>
            <button className='btn delete-btn' onClick={handleDeleteJob}>
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
