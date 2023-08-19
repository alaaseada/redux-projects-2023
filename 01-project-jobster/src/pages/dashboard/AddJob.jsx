import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FormRow, FormRowSelect } from '../../components';
import { toast } from 'react-toastify';
import {
  handleJobInput,
  clearValues,
  addNewJob,
  editJob,
} from '../../features/job/jobSlice';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    position,
    company,
    status,
    jobLocation,
    jobType,
    jobTypeOptions,
    jobStatusOptions,
    jobEditId,
  } = useSelector((store) => store.jobs);
  const { user } = useSelector((store) => store.users);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !location || !position) {
      toast.error('Please provide all values.');
      return;
    }
    if (isEditing) {
      dispatch(
        editJob({
          id: jobEditId,
          job: {
            position,
            status,
            jobLocation,
            jobType,
            company,
          },
        })
      );
      return;
    }
    dispatch(addNewJob({ position, status, jobLocation, jobType, company }));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleJobInput({ name, value }));
  };
  const clearForm = () => {
    dispatch(clearValues());
  };
  useEffect(() => {
    if (!isEditing)
      dispatch(handleJobInput({ name: 'jobLocation', value: user.location }));
  }, []);
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Job' : 'Add job'}</h3>
        <div className='form-center'>
          <FormRow
            name='position'
            type='text'
            value={position}
            handleFn={handleChange}
          />
          <FormRow
            name='company'
            type='text'
            value={company}
            handleFn={handleChange}
          />
          <FormRow
            labelText='job location'
            name='jobLocation'
            type='text'
            value={jobLocation}
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='Job Type'
            name='jobType'
            value={jobType}
            options={jobTypeOptions}
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='Job Status'
            name='status'
            value={status}
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
