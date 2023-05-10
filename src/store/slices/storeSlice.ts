import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitStoreState } from './type';
import { toast } from 'react-toastify';
import storeApi from 'axiosConfig/api/store';

const initialState: TInitStoreState = {
  stores: [],
  loading: false,
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

const storeSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSupplyStore.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSupplyStore.fulfilled, (state, action) => {
      state.loading = false;
      state.stores = action.payload;
    });
  },
});

export const { actions, reducer: storeReducer } = storeSlice;
export const {} = actions;
