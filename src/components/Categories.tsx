import React from 'react';

type ICategories = {
  index: number;
  onClick: (a: number) => void;
};

const Categories: React.FC<ICategories> = React.memo(({ index, onClick }) => {
  const categories = ['All', 'Spicy', 'Tomato', 'Bacon', 'Sharp', 'Lots of cheese'];
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClick(+`${i}`)} className={index === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
