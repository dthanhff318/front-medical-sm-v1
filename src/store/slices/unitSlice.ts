import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TCreateUnits, TGetSupplier, TInitUnitState } from './type';
import { toast } from 'react-toastify';
import { TUnit } from 'types/unit';
import unitApi from 'axiosConfig/api/unit';

const initialState: TInitUnitState = {
  units: [],
  loading: false,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
};
//Get supplier Pagination
export const getUnit = createAsyncThunk(
  'unit/getUnit',
  async (query: TGetSupplier, thunkApi) => {
    try {
      const res = await unitApi.getListUnit(query);
      return res.data;
    } catch (err) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);
// Update supplier
export const updateUnit = createAsyncThunk('unit/updateUnit', async (data: any) => {
  try {
    const { id, ...body } = data;
    const res = await unitApi.updateUnit(id, body);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
//create unit
export const createNewUnits = createAsyncThunk(
  'unit/createUnit',
  async (data: TCreateUnits, thunkApi) => {
    try {
      const res = await unitApi.createUnit(data);
      toast.success('Tạo mới đơn vị thành công!');
      return res.data as TUnit;
    } catch (err: any) {
      toast.error(`Có lỗi xảy ra, vui lòng thử lại`);
      return thunkApi.rejectWithValue({});
    }
  },
);
// Delete supplier
export const deleteUnit = createAsyncThunk('unit/deleteUnit', async (id: number) => {
  try {
    await unitApi.deleteUnit(id);
    return id;
  } catch (err) {
    console.log(err);
  }
});

const unitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    // saveSupplierDetail: (state, action) => {
    //   state.supplierDetail = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getUnit.fulfilled, (state, action) => {
      const { results, pagination } = action.payload;
      state.units = results;
      state.pagination = pagination;
    });
    builder.addCase(createNewUnits.fulfilled, (state: TInitUnitState, action) => {
      state.units.push(action.payload);
    });
    builder.addCase(deleteUnit.fulfilled, (state, action) => {
      const remainSupplier = state.units.filter((d: TUnit) => d.id !== action.payload);
      state.units = remainSupplier;
    });
    builder.addCase(updateUnit.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUnit.fulfilled, (state, action) => {
      state.loading = false;
      //state.supplierDetail = action.payload;
    });
  },
});

export const { actions, reducer: unitReducer } = unitSlice;

