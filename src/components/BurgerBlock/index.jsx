import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const typeNames = ['Traditional', 'Black'];

function BurgerBlock({ id, price, title, imageUrl, sizes, types, rating, category }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartSlice.items.find((obj) => obj.id === id));

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className='burger-block-wrapper'>
      <div className='burger-block'>
        <img className='burger-block__image' src={imageUrl} alt='burger' />
        <h4 className='burger-block__title'>{title}</h4>
        <div className='burger-block__selector'>
          <ul>
            {types.map((type, i) => (
              <li
                key={type}
                onClick={() => setActiveType(i)}
                className={activeType === i ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}
              >
                {size} lb.
              </li>
            ))}
          </ul>
        </div>
        <div className='burger-block__bottom'>
          <div className='burger-block__price'>from {price} $</div>
          <button onClick={onClickAdd} className='button button--outline button--add'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Ad</span>
            {addedCount > 0 && (<i>{addedCount}</i>)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BurgerBlock;
