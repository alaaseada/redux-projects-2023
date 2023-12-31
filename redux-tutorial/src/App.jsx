import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotals, getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isclosed } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems('Alaa'));
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className='loading'>
        <h4>Loading...</h4>
      </div>
    );
  }
  return (
    <main>
      {!isclosed && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
