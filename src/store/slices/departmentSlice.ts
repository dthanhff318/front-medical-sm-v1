import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import departmentApi from 'axiosConfig/api/department';
import userApi from 'axiosConfig/api/user';
import { toast } from 'react-toastify';
import { TDepartment } from 'types/department';
import { TCreateDepartments, TCreateUser, TGetDepartments, TInitDepartmentState } from './type';

const initialState: TInitDepartmentState = {
  departmentList: [],
  departmentDetail: {},
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
  loading: '',
};

// Get Departments Pagination
export const getDepartments = createAsyncThunk(
  'department/getDepartments',
  async (query: TGetDepartments, thunkApi) => {
    try {
      const res = await departmentApi.getDepartments(query);
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue({});
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
      return res.data as TDepartment;
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
// Update department
export const updateDepartment = createAsyncThunk('department/updateDepartment', async (data: any) => {
  try {
    const { id, ...body } = data;
    const res = await departmentApi.updateDepartment(id, body);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
// delete user department
export const deleteUserDepartment = createAsyncThunk(
  'department/deleteUserDepartment',
  async (id: number) => {
    try {
      await userApi.deleteUser(id);
      toast.success('Đã xóa người dùng !');
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
      const { results, pagination } = action.payload;
      state.departmentList = results;
      state.pagination = pagination;
    });
    builder.addCase(createNewDepartments.fulfilled, (state: TInitDepartmentState, action) => {
      state.departmentList.push(action.payload);
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      const remainDepartments = state.departmentList.filter(
        (d: TDepartment) => d.id === action.payload,
      );
      state.departmentList = remainDepartments;
    });
    builder.addCase(getDepartmentInfoDetail.pending, (state, action) => {
      state.loading = 'user';
    });
    builder.addCase(getDepartmentInfoDetail.fulfilled, (state, action) => {
      state.departmentDetail = action.payload;
      state.loading = '';
    });
    // User
    builder.addCase(createUserDepartment.pending, (state, action) => {
      state.loading = 'user';
    });
    builder.addCase(createUserDepartment.fulfilled, (state, action) => {
      state.loading = '';
      state.departmentDetail.member?.push(action.payload);
    });
    builder.addCase(deleteUserDepartment.fulfilled, (state, action) => {
      const listUserRemain = state.departmentDetail?.member?.filter((u) => u.id !== action.payload);
      state.departmentDetail.member = listUserRemain;
    });
    builder.addCase(updateDepartment.pending, (state, action) => {
      state.loading = 'user';

    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      state.loading = '';
      state.departmentDetail = action.payload;
    });
  },
});

export const { actions, reducer: departmentReducer } = departmentSlice;
export const {} = actions;
