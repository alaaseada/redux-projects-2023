import { useState } from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '../components';
import {
  jobTypeOptions,
  jobStatusOptions,
  sortOptions,
} from '../utils/constants';

const initialState = {
  search: '',
  status: 'all',
  jobType: 'all',
  sort: 'latest',
};
const SearchForm = () => {
  const [searchCriteria, setSearchCriteria] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

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
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='job status'
            name='status'
            value={searchCriteria.status}
            options={['all', ...jobStatusOptions]}
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='job type'
            name='jobType'
            value={searchCriteria.jobType}
            options={['all', ...jobTypeOptions]}
            handleFn={handleChange}
          />
          <FormRowSelect
            labelText='sort'
            name='sort'
            value={searchCriteria.sort}
            options={['all', ...sortOptions]}
            handleFn={handleChange}
          />
          <button class='btn btn-block btn-danger'>Clear filters</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchForm;
