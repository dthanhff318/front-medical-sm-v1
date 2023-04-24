import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import departmentApi from 'axiosConfig/api/department';
import userApi from 'axiosConfig/api/user';
import { toast } from 'react-toastify';
import { TCreateDepartments, TCreateUser, TGetDepartments, TInitDepartmentState } from './type';

const initialState: TInitDepartmentState = {
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
  async (data: TCreateDepartments, thunkApi) => {
    try {
      const res = await departmentApi.createDepartments(data);
      toast.success('Tao khoa phong thanh cong !');
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
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

// Delete department
export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment ',
  async (id: number) => {
    try {
      await departmentApi.deleteDepartments(id);
      return id;
    } catch (err) {
      console.log(err);
    }
  },
);

// create user department
export const createUserDepartment = createAsyncThunk(
  'department/createUserDepartment',
  async (data: TCreateUser, thunkApi) => {
    try {
      const res = await userApi.createUser(data);
      toast.success('Them nguoi dung thanh cong !');
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

// delete user department
export const deleteUserDepartment = createAsyncThunk(
  'department/deleteUserDepartment',
  async (id: number) => {
    try {
      await userApi.deleteUser(id);
      toast.success('Da xoa nguoi dung !');
      return id;
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
      console.log(456);
      state.departmentList.push(action.payload);
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      const remainDepartments = state.departmentList.filter((d) => d.id === action.payload);
      state.departmentList = remainDepartments;
    });
    builder.addCase(getDepartmentInfoDetail.fulfilled, (state, action) => {
      state.departmentDetail = action.payload;
    });
    // User
    builder.addCase(createUserDepartment.fulfilled, (state, action) => {
      state.departmentDetail.member.push(action.payload);
    });
    builder.addCase(deleteUserDepartment.fulfilled, (state, action) => {
      const listUserRemain = state.departmentDetail?.member?.filter((u) => u.id !== action.payload);
      state.departmentDetail.member = listUserRemain;
    });
  },
});

export const { actions, reducer: departmentReducer } = departmentSlice;
export const {} = actions;
