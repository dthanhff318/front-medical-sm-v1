import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitSupplierState } from './type';
import { toast } from 'react-toastify';
import supplierApi from 'axiosConfig/api/supplier';

const initialState: TInitSupplierState = {
  suppliers: [],
  loading: false,
};
// Get supplier Pagination
// export const getDepartments = createAsyncThunk(
//   'department/getDepartments',
//   async (query: TGetDepartments, thunkApi) => {
//     try {
//       const res = await departmentApi.getDepartments(query);
//       return res.data;
//     } catch (err) {
//       return thunkApi.rejectWithValue({});
//     }
//   },
// );
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(findSupplier.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
  },
});

export const { actions, reducer: supplierReducer } = supplierSlice;
export const {} = actions;
