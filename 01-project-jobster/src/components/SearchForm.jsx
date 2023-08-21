import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchCriteria,
  clearSearchCriteria,
} from '../features/allJobs/allJobsSlice';

const SearchForm = () => {
  const { search, searchStatus, searchJobType, sort, sortOptions, isLoading } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, jobStatusOptions } = useSelector(
    (store) => store.jobs
  );
  const dispatch = useDispatch();

  const handleFn = (e) => {
    if (isLoading) return;
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setSearchCriteria({ name, value }));
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          <FormRow
            labelText='search'
            name='search'
            value={search}
            type='text'
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='job status'
            name='searchJobStatus'
            value={searchStatus}
            options={['all', ...jobStatusOptions]}
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='job type'
            name='searchJobType'
            value={searchJobType}
            options={['all', ...jobTypeOptions]}
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='sort'
            name='sort'
            value={sort}
            options={['all', ...sortOptions]}
            handleFn={handleFn}
          />
          <button
            className='btn btn-block btn-danger'
            onClick={(e) => {
              e.preventDefault();
              dispatch(clearSearchCriteria());
            }}
          >
            Clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchForm;
