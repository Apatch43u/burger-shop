import { TypeCartItem } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: TypeCartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
