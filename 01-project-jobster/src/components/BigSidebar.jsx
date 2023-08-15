import Wrapper from '../assets/wrappers/BigSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../components';
import { NavLinks } from '../components';
import { useEffect } from 'react';
import { toggleSidebar } from '../features/user/userSlice';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleSidebar());
  }, []);

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
