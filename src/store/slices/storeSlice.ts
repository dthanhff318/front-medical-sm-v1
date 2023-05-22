import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitStoreState } from './type';
import { toast } from 'react-toastify';
import storeApi from 'axiosConfig/api/store';

const initialState: TInitStoreState = {
  stores: [],
  loading: false,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
};

export const getSupplyStore = createAsyncThunk(
  'store/getSupplyStore',
  async (conditon: any, thunkApi) => {
    try {
      const res = await storeApi.getSupplyFromStore(conditon);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

export const deleteSupplyStore = createAsyncThunk(
  'store/deleteSupplyStore',
  async (id: number, thunkApi) => {
    try {
      await storeApi.deleteSupply(id);
      return id;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

const storeSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSupplyStore.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSupplyStore.fulfilled, (state, action) => {
      const { results, pagination } = action.payload;
      state.loading = false;
      state.stores = results;
      state.pagination = pagination;
    });
    builder.addCase(deleteSupplyStore.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSupplyStore.fulfilled, (state, action) => {
      const remainList = state.stores.filter((s) => s.id !== action.payload);
      return {
        ...state,
        loading: false,
        stores: remainList,
      };
    });
  },
});

export const { actions, reducer: storeReducer } = storeSlice;
export const {} = actions;
