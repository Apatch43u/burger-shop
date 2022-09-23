import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'popular',
    sortProperty: '-rating',
  },
  searchValue: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  },
});

export const selectFilter = (state) => state.filterSlice;
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
