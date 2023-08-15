import Wrapper from '../assets/wrappers/SmallSidebar';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { toggleSidebar } from '../features/user/userSlice';
import { Logo } from '../components';
import { NavLinks } from '../components';

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const hideSidebar = (e) => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className='content'>
          <button className='close-btn' onClick={hideSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={hideSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
