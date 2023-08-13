import { useState, useEffect } from 'react';
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from 'react-toastify';
import { registerUser, login } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const initialValues = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
function Register() {
  const [values, setValues] = useState(initialValues);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.users);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Some fields are empty.');
      return;
    }
    values.isMember
      ? dispatch(login({ email, password }))
      : dispatch(registerUser({ name, email, password }));
  };
  const toggleMember = (e) => {
    e.preventDefault();
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {!values.isMember && (
          <FormRow
            labelText={'Name'}
            type={'text'}
            name={'name'}
            value={values.name}
            handleFn={handleChange}
          />
        )}
        <FormRow
          labelText={'Email'}
          type={'email'}
          name={'email'}
          value={values.email}
          handleFn={handleChange}
        />
        <FormRow
          labelText={'Password'}
          type={'password'}
          name={'password'}
          value={values.password}
          handleFn={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <p>
          {values.isMember
            ? "Don't have an account yet?"
            : ' Already a member?'}
          <button className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default Register;
