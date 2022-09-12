import React from 'react';
import ReactPaginate from 'react-paginate';
import cl from './Pagination.module.scss';

const Pagination = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={cl.root}
      breakLabel='...'
      nextLabel='>'
      previousLabel='<'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={2}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
