import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div className='cart cart--empty'>
      <h2>
        Cart is empty <span>😔</span>
      </h2>
      <p>
        Most likely, you have not ordered burgers yet. <br /> To order a burger go to the main page
      </p>
      <img src='https://cdn-icons-png.flaticon.com/512/2762/2762885.png' alt='empty-cart' />
      <Link to='/'>
        <span className='button button--black'>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
