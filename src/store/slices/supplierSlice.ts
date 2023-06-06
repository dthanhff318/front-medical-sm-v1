import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TGetSupplier, TInitSupplierState } from './type';
import { toast } from 'react-toastify';
import supplierApi from 'axiosConfig/api/supplier';
import { TSupplier } from 'types/supplier';

const initialState: TInitSupplierState = {
  suppliers: [],
  supplierDetail: {},
  loading: false,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
};
//Get supplier Pagination
export const getSupplier = createAsyncThunk(
  'supplier/getSupplier',
  async (query: TGetSupplier, thunkApi) => {
    try {
      const res = await supplierApi.getListsupplier(query);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({});
    }
  },
);
// Update supplier
export const updateSupplier = createAsyncThunk('supplier/updateSupplier', async (data: any) => {
  try {
    const { id, ...body } = data;
    const res = await supplierApi.updateSupplier(id, body);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
// Delete supplier
export const deleteSupplier = createAsyncThunk('supplier/deleteSupplier', async (id: number) => {
  try {
    await supplierApi.deleteSupplier(id);
    return id;
  } catch (err) {
    console.log(err);
  }
});
// get detail supplier
export const getSupplierInfoDetail = createAsyncThunk(
  'supplier/getSupplierInfoDetail',
  async (id: string) => {
    try {
      const res = await supplierApi.getSupplierDetail(id);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
);
export const findSupplier = createAsyncThunk(
  'supplier/findSupplier',
  async (value: string, thunkApi) => {
    try {
      const res = await supplierApi.findsupplier(value);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    saveSupplierDetail: (state, action) => {
      state.supplierDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      const { results, pagination } = action.payload;
      state.suppliers = results;
      state.pagination = pagination;
    });
    builder.addCase(deleteSupplier.fulfilled, (state, action) => {
      const remainSupplier = state.suppliers.filter((d: TSupplier) => d.id !== action.payload);
      state.suppliers = remainSupplier;
    });
    builder.addCase(getSupplierInfoDetail.fulfilled, (state, action) => {
      state.supplierDetail = action.payload;
    });
    builder.addCase(findSupplier.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
    builder.addCase(updateSupplier.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSupplier.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierDetail = action.payload;
    });
  },
});

export const { actions, reducer: supplierReducer } = supplierSlice;
export const { saveSupplierDetail } = actions;
