import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import burgerSlice from './slices/burgerSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    burgerSlice,
  },
});
