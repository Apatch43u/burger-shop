import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import BurgerBlock from '../components/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';

const Home = () => {
  const [burgers, setBurgers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = React.useContext(AppContext);

  const [sort, setSort] = useState({
    name: 'popular',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://63173fb782797be77ff7690f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setBurgers(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories index={categoryId} onClick={(id) => setCategoryId(id)} />
        <Sort index={sort} onChange={(id) => setSort(id)} />
      </div>
      <h2 className='content__title'>All burgers</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : burgers
              .filter((obj) => {
                if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((obj) => <BurgerBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
