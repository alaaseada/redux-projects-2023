import React from 'react';
import { CartIcon } from '../icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { order_amount } = useSelector((store) => store.cart);
  return (
    <nav>
      <div className='nav-center'>
        <h3>Redux toolkit</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{order_amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
