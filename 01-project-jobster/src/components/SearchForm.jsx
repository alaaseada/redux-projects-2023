import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '../components';
import {
  jobTypeOptions,
  jobStatusOptions,
  sortOptions,
} from '../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchCriteria } from '../features/allJobs/allJobsSlice';

const SearchForm = () => {
  const { search, searchStatus, searchJobType, sort } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();

  const handleFn = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
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
            name='status'
            value={searchStatus}
            options={['all', ...jobStatusOptions]}
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
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
          <button className='btn btn-block btn-danger'>Clear filters</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchForm;
