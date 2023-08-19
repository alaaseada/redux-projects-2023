import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '../components';
import {
  jobTypeOptions,
  jobStatusOptions,
  sortOptions,
} from '../utils/constants';

const SearchForm = ({ searchCriteria, handleFn }) => {
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search Form</h4>
        <div className='form-center'>
          <FormRow
            labelText='search'
            name='search'
            value={searchCriteria.search}
            type='text'
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='job status'
            name='status'
            value={searchCriteria.status}
            options={['all', ...jobStatusOptions]}
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            value={searchCriteria.jobType}
            options={['all', ...jobTypeOptions]}
            handleFn={handleFn}
          />
          <FormRowSelect
            labelText='sort'
            name='sort'
            value={searchCriteria.sort}
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
