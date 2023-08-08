import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isclosed: true,
};
const modalSlice = createSlice({
  name: 'Modal',
  initialState: initialState,
  reducers: {
    closeModal: (state) => {
      state.isclosed = true;
    },
    openModal: (state) => {
      state.isclosed = false;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
