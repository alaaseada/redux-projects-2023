import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { Logo } from '../components';
import { toggleSidebar, logoutUser } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { clearState } from '../features/allJobs/allJobsSlice';
import { clearValues } from '../features/job/jobSlice';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
  };

  const clearAll = (dispatch) => {
    dispatch(logoutUser('Logging out'));
    dispatch(clearState());
    dispatch(clearValues());
  };

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          className='toggle-btn'
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button className='btn' type='btn' onClick={toggleDropDown}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => {
                clearAll(dispatch);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
