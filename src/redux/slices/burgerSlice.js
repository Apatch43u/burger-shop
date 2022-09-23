import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBurgers = createAsyncThunk('burger/fetchBurgersStatus', async (params, thunkAPI) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://63173fb782797be77ff7690f.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );

  if(data.length === 0) {
    return thunkAPI.rejectWithValue('None burgers');
  }

  return thunkAPI.fulfillWithValue(data);
});

const initialState = {
  items: [],
  status: 'loading',
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchBurgers.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchBurgers.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchBurgers.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectBurgers = (state) => state.burgerSlice;
export const { setItems } = burgerSlice.actions;

export default burgerSlice.reducer;
