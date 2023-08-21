import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handlePage } from '../features/allJobs/allJobsSlice';
import { FaForward, FaBackward } from 'react-icons/fa';

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  const pages_array = Array.from(
    { length: numOfPages },
    (_, index) => index + 1
  );

  const changePage = (e, pageNum) => {
    e.preventDefault();
    dispatch(handlePage(pageNum));
  };
  return (
    <Wrapper>
      <button
        className='prev-btn'
        onClick={(e) => changePage(e, page - 1)}
        disabled={page === 1}
      >
        <FaBackward />
        Previous
      </button>
      <div className='btn-container'>
        {pages_array.map((item) => (
          <button
            className={`pageBtn ${page === item ? 'active' : ''}`}
            name='page'
            onClick={(e) => changePage(e, item)}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        className='next-btn'
        onClick={(e) => changePage(e, page + 1)}
        disabled={page === numOfPages}
      >
        Next <FaForward />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
