import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const calculateAmountAndTotal = (cart) => {
  console.log(cart);
  const { amount, total } = cart.reduce(
    ({ amount, total }, item) => {
      amount += item.amount;
      total += item.price * item.amount;
      return { amount, total };
    },
    { amount: 0, total: 0 }
  );
  console.log(amount, total);
  return { amount, total };
};

const initialState = {
  cartItems: cartItems,
  isLoading: true,
  order_total: calculateAmountAndTotal(cartItems).total,
  order_amount: calculateAmountAndTotal(cartItems).amount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id != id);
    },
    increase: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          item.amount += 1;
          state.order_total += Number(item.price);
        }
        return item;
      });
      state.order_amount += 1;
    },
  },
});

export const { clearCart, removeItem, increase } = cartSlice.actions;
export default cartSlice.reducer;
