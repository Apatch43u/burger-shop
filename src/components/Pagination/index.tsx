import React from 'react';
import ReactPaginate from 'react-paginate';
import cl from './Pagination.module.scss';

type IPagination = {
  onChangePage: (page: number) => void;
  value: number;
};

const Pagination: React.FC<IPagination> = ({ onChangePage, value }) => (
  <ReactPaginate
    className={cl.root}
    breakLabel='...'
    nextLabel='>'
    previousLabel='<'
    onPageChange={(event) => onChangePage(event.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={2}
    forcePage={value - 1}
  />
);
export default Pagination;
