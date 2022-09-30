import React, { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import {
  FilterSliceState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import BurgerBlock from '../components/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchBurgers, selectBurgers, TypeSort } from '../redux/slices/burgerSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSearch = useRef(false);
  const isMouted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectBurgers);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const getBurgers = () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchBurgers({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (isMouted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   isMouted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as TypeSort;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(setFilters({
  //       categoryId: +params.category,
  //       currentPage: +params.currentPage,
  //       sort: sort || list[0],
  //       searchValue: params.search,
  //     }));

  //     isSearch.current = true;
  //   }
  //   getBurgers();
  // }, []);

  useEffect(() => {
    getBurgers();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletonRender = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const burgersRender = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((obj: any) => <BurgerBlock key={obj.id} {...obj} />);

  return (
    <div className='container'>
      {status === 'error' ? (
        <div className='content__error'>
          <h2>Burger`s none found</h2>
          <p>None burger`s, please reload page</p>
        </div>
      ) : (
        <>
          <div className='content__top'>
            <Categories index={categoryId} onClick={onClickCategory} />
            <Sort value={sort}/>
          </div>
          <h2 className='content__title'>All burgers</h2>
          <div className='content__items'>
            {status === 'loading' ? skeletonRender : burgersRender}
          </div>
          <Pagination onChangePage={onChangePage} value={currentPage} />
        </>
      )}
    </div>
  );
};

export default Home;
