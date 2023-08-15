import { useState } from 'react';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow } from '../../components';
import { UpdateUser } from '../../features/user/userThunks';

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const { name, lastName, location, email } = formValues;
    if (!name || !email || !lastName || !location) {
      toast.error('Please provide all fields.');
      return;
    }
    dispatch(UpdateUser({ ...formValues }));
  };
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSumbit}>
        <h3>Profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={formValues.name}
            handleFn={handleChange}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={formValues.lastName}
            handleFn={handleChange}
          />
          <FormRow
            type='email'
            name='email'
            value={formValues.email}
            handleFn={handleChange}
          />
          <FormRow
            type='text'
            name='location'
            value={formValues.location}
            handleFn={handleChange}
          />
          <button className='btn block-btn' type='submit' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
