import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import BurgerBlock from '../components/BurgerBlock';
import Skeleton from '../components/BurgerBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchBurgers, selectBurgers } from '../redux/slices/burgerSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const isSearch = useRef(false);
  const isMouted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectBurgers);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getBurgers = async () => {
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

  useEffect(() => {
    if (isMouted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMouted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
    getBurgers();
  }, []);

  useEffect(() => {
    getBurgers();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletonRender = [...new Array(8)].map((_, index) => <Skeleton key={index} />);
  const burgersRender = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    })
    .map((obj) => <BurgerBlock key={obj.id} {...obj} />);

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
            <Sort />
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
