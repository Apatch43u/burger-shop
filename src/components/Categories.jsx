import React, { useState } from 'react';

function Categories({ index, onClick }) {

  const categories = ['All', 'Spicy', 'Tomato', 'Bacon', 'Sharp', 'Lots of cheese'];
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClick(i)}
            className={index === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
