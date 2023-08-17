import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FormRow } from '../../components';
import { jobTypeOptions, jobStatusOptions } from '../../utils/constants';
import FormRowSelect from '../../components/FormRowSelect';
import { submitJob } from '../../features/job/jobSlice';
import { addNewJob } from '../../features/job/jobSlice';

const AddJob = () => {
  const { user } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const { job, isLoading } = useSelector((store) => store.jobs);

  const initialState = {
    position: '',
    company: '',
    jobLocation: user?.location || '',
    status: 'pending',
    jobType: '',
  };
  const [jobInfo, setJobInfo] = useState(initialState);

  useEffect(() => {
    setJobInfo({ ...jobInfo, jobLocation: user?.location || '' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewJob(jobInfo));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJobInfo({ ...jobInfo, [name]: value });
  };
  const clearForm = (e) => {
    e.preventDefault();
    setJobInfo(initialState);
  };
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Add job</h3>
        <div className='form-center'>
          <FormRow
            name='position'
            type='text'
            value={jobInfo.position}
            handleFn={handleChange}
          />
          <FormRow
            name='company'
            type='text'
            value={jobInfo.company}
            handleFn={handleChange}
          />
          <FormRow
            labelText='job location'
            name='jobLocation'
            type='text'
            value={jobInfo.jobLocation}
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='Job Type'
            name='jobType'
            value={jobInfo.jobType}
            options={jobTypeOptions}
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='Job Status'
            name='status'
            value={jobInfo.status}
            options={jobStatusOptions}
            handleFn={handleChange}
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn block-btn clear-btn'
              onClick={clearForm}
            >
              Clear
            </button>
            <button
              type='submit'
              className='btn block-btn submit-btn'
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;
