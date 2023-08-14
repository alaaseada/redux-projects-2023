import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { Logo } from '../components';
import { toggleSidebar } from '../features/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
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
          </button>
          <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
            <button
              type='button'
              className='dropdown-btn'
              onClick={() => console.log('logout user')}
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