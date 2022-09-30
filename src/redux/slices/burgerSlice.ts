import axios from 'axios';
import { burgerHref } from '../../requests/requests';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Sort } from './filterSlice';

type TypeItems = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TypeSort = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: number;
};

interface BurgerSliceState {
  items: TypeItems[];
  status: Status;
}

const initialState: BurgerSliceState = {
  items: [],
  status: Status.LOADING,
};


export const fetchBurgers = createAsyncThunk<TypeItems[], TypeSort>(
  'burger/fetchBurgersStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      /*<TypeItems[]>*/ `${burgerHref}?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data;
  },
);

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TypeItems[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBurgers.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBurgers.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchBurgers.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectBurgers = (state: RootState) => state.burgerSlice;

export const { setItems } = burgerSlice.actions;

export default burgerSlice.reducer;
