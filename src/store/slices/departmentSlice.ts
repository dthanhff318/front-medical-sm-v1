import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import departmentApi from 'axiosConfig/api/department';
import { TGetDepartments } from 'axiosConfig/api/department/type';

const initialState: any = {
  departmentList: [],
};

export const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async (query: TGetDepartments) => {
    try {
      const res = await departmentApi.getDepartments(query);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
);
const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.departmentList = action.payload;
    });
  },
});

export const { actions, reducer: departmentReducer } = departmentSlice;
export const {} = actions;
