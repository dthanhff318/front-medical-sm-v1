import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitPlanState } from './type';
import { toast } from 'react-toastify';
import planApi from 'axiosConfig/api/plan';
import { IndexedObject } from 'types/common';

const initialState: TInitPlanState = {
  loading: false,
  plans: [],
  planDetail: {},
};

export const getPlans = createAsyncThunk(
  'plan/getPlans',
  async (params: IndexedObject, thunkApi) => {
    try {
      const res = await planApi.getPlans(params);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

export const getPlanDetail = createAsyncThunk(
  'plan/getPlanDetail',
  async (id: number, thunkApi) => {
    try {
      const res = await planApi.getPlanDetail(id);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

const planSlice = createSlice({
  name: 'bidding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPlans.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPlans.fulfilled, (state, action) => {
      state.plans = action.payload;
      state.loading = false;
    });
    builder.addCase(getPlanDetail.fulfilled, (state, action) => {
      state.planDetail = action.payload;
    });
  },
});

export const { actions, reducer: planReducer } = planSlice;
export const {} = actions;
