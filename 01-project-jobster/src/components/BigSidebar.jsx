import Wrapper from '../assets/wrappers/BigSidebar';
import { FaWindowClose } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.users);
  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSidebarOpen ? 'show-sidebar' : ''}`}
      >
        <div className='content'>
          <button className='close-btn'>
            <FaWindowClose />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
