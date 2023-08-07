import { ChevronDown, ChevronUp } from '../icons';
import { removeItem, increase } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ id, img, price, title, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h5>{title}</h5>
        <span className='item-price'>${price}</span>
        <button className='remove-btn' onClick={() => dispatch(removeItem(id))}>
          Remove
        </button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => dispatch(increase(id))}>
          <ChevronUp />
        </button>
        <span className='amount'>{amount}</span>
        <button className='amount-btn'>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
