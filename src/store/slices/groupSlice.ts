import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TCreateGroups, TGetSupplier, TInitGroupState } from './type';
import { toast } from 'react-toastify';
import groupApi from 'axiosConfig/api/group';
import { TGroup } from 'types/group';

const initialState: TInitGroupState = {
  groups: [],
  loading: false,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
};
//Get supplier Pagination
export const getGroup = createAsyncThunk(
  'group/getGroup',
  async (query: TGetSupplier, thunkApi) => {
    try {
      const res = await groupApi.getListGroup(query);
      return res.data;
    } catch (err) {
      toast.error(`Có lỗi xảy ra, vui lòng thử lại`);
      return thunkApi.rejectWithValue({});
    }
  },
);
//create group
export const createNewGroups = createAsyncThunk(
  'group/createGroup',
  async (data: TCreateGroups, thunkApi) => {
    try {
      const res = await groupApi.createGroup(data);
      toast.success('Tạo mới nhóm thành công !');
      return res.data as TGroup;
    } catch (err: any) {
      toast.error(`Có lỗi xảy ra, vui lòng thử lại`);
      return thunkApi.rejectWithValue({});
    }
  },
);
// Update supplier
export const updateGroup = createAsyncThunk('unit/updateUnit', async (data: any) => {
  try {
    const { id, ...body } = data;
    const res = await groupApi.updateGroup(id, body);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
// Delete supplier
export const deleteGroup = createAsyncThunk('unit/deleteUnit', async (id: number) => {
  try {
    await groupApi.deleteGroup(id);
    return id;
  } catch (err) {
    console.log(err);
  }
});

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    // saveSupplierDetail: (state, action) => {
    //   state.supplierDetail = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroup.fulfilled, (state, action) => {
      const { results, pagination } = action.payload;
      state.groups = results;
      state.pagination = pagination;
    });
    builder.addCase(createNewGroups.fulfilled, (state: TInitGroupState, action) => {
      state.groups.push(action.payload);
    });
    builder.addCase(deleteGroup.fulfilled, (state, action) => {
      const remainSupplier = state.groups.filter((d: TGroup) => d.id !== action.payload);
      state.groups = remainSupplier;
    });
    builder.addCase(updateGroup.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateGroup.fulfilled, (state, action) => {
      state.loading = false;
      //state.supplierDetail = action.payload;
    });
  },
});

export const { actions, reducer: groupReducer } = groupSlice;

