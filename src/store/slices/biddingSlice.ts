import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitBiddingState } from './type';
import biddingApi from 'axiosConfig/api/bidding';
import { toast } from 'react-toastify';

const initialState: TInitBiddingState = {
  listBidding: [],
  loading: false,
  findBidding: [],
  findLoading: false,
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 0,
  },
};

export const getListBidding = createAsyncThunk(
  'bidding/getListBidding',
  async (params: any, thunkApi) => {
    try {
      const res = await biddingApi.getListBidding(params);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

export const findBiddingWithSupplier = createAsyncThunk(
  'bidding/findBiddingWithSupplier',
  async (id: string, thunkApi) => {
    try {
      const res = await biddingApi.findBidding(id);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

export const deleteSupplyBidding = createAsyncThunk(
  'bidding/deleteSupplyBidding',
  async (id: number, thunkApi) => {
    try {
      await biddingApi.deleteBidding(id);
      return id;
    } catch (err: any) {
      toast.error(`Có lỗi xảy ra, vui lòng thử lại`);
      return thunkApi.rejectWithValue({});
    }
  },
);

const biddingSlice = createSlice({
  name: 'bidding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListBidding.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getListBidding.fulfilled, (state, action) => {
      const { results, pagination } = action.payload;
      state.listBidding = results;
      state.loading = false;
      state.pagination = pagination;
    });
    builder.addCase(findBiddingWithSupplier.pending, (state, _) => {
      state.findLoading = true;
    });
    builder.addCase(findBiddingWithSupplier.fulfilled, (state, action) => {
      state.findBidding = action.payload;
      state.findLoading = false;
    });
    builder.addCase(deleteSupplyBidding.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteSupplyBidding.fulfilled, (state, action) => {
      const remainList = state.listBidding.filter((s) => s.id !== action.payload);
      return {
        ...state,
        loading: false,
        listBidding: remainList,
      };
    });
    builder.addCase(deleteSupplyBidding.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { actions, reducer: biddingReducer } = biddingSlice;
export const {} = actions;
