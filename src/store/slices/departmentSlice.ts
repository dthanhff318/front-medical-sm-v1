import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import departmentApi from 'axiosConfig/api/department';
import userApi from 'axiosConfig/api/user';
import { TCreateDepartments, TCreateUser, TGetDepartments, TInitState } from './type';

const initialState: TInitState = {
  departmentList: [],
  departmentDetail: {},
};

// Get Departments Pagination
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

// Create a department
export const createNewDepartments = createAsyncThunk(
  'department/createNewDepartments',
  async (data: TCreateDepartments) => {
    try {
      const res = await departmentApi.createDepartments(data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
);

// get detail department
export const getDepartmentInfoDetail = createAsyncThunk(
  'department/getDepartmentInfoDetail',
  async (id: string) => {
    try {
      const res = await departmentApi.getDepartmentDetail(id);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
);

// create user department
export const createUserDepartment = createAsyncThunk(
  'department/createUserDepartment',
  async (data: TCreateUser) => {
    try {
      const res = await userApi.createUser(data);
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
    builder.addCase(createNewDepartments.fulfilled, (state, action) => {
      state.departmentList.push(action.payload);
    });
    builder.addCase(getDepartmentInfoDetail.fulfilled, (state, action) => {
      state.departmentDetail = action.payload;
    });
  },
});

export const { actions, reducer: departmentReducer } = departmentSlice;
export const {} = actions;
