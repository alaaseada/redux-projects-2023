import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FormRow } from '../../components';

const AddJob = () => {
  const { user } = useSelector((store) => store.users);
  const { job, isLoading } = useSelector((store) => store.jobs);

  const initialState = {
    position: '',
    company: '',
    jobLocation: user?.location || '',
    status: 'pending',
    jobType: '',
  };
  const [jobInfo, setJobInfo] = useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
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
            name='location'
            type='text'
            value={jobInfo.location}
            handleFn={handleChange}
          />
          <div className='form-row'>
            <label className='form-label' htmlFor='status'>
              status
            </label>
            <select
              name='status'
              className='form-input'
              value={jobInfo.status}
              onChange={handleChange}
            >
              <option value='declined'>Declined</option>
              <option value='interview'>Interview</option>
              <option value='pending'>Pending</option>
            </select>
          </div>
          <div className='form-row'>
            <label className='form-label' htmlFor='type'>
              job type
            </label>
            <select
              name='type'
              className='form-input'
              value={jobInfo.type}
              onChange={handleChange}
            >
              <option value='full-time'>Full-time</option>
              <option value='part-time'>Part-time</option>
              <option value='remote'>Remote</option>
              <option value='internship'>Internship</option>
            </select>
          </div>
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
