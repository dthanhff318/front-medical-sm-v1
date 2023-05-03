import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitBiddingState } from './type';
import biddingApi from 'axiosConfig/api/bidding';
import { toast } from 'react-toastify';

const initialState: TInitBiddingState = {
  listBidding: [],
  loading: false,
  findBidding: [],
  findLoading: false,
};

export const getListBidding = createAsyncThunk('bidding/getListBidding', async (_, thunkApi) => {
  try {
    const res = await biddingApi.getListBidding();
    toast.success('Cap nhat thongg tin dau thau thanh cong !');
    return res.data;
  } catch (err: any) {
    toast.error(`Co loi xay ra, vui long thu lai`);
    return thunkApi.rejectWithValue({});
  }
});

export const findBidding = createAsyncThunk(
  'bidding/findBidding',
  async (value: string, thunkApi) => {
    try {
      const res = await biddingApi.findBidding(value);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
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
      state.listBidding = action.payload;
      state.loading = false;
    });
    builder.addCase(findBidding.pending, (state, _) => {
      state.findLoading = true;
    });
    builder.addCase(findBidding.fulfilled, (state, action) => {
      state.findBidding = action.payload;
      state.findLoading = false;
    });
  },
});

export const { actions, reducer: biddingReducer } = biddingSlice;
export const {} = actions;
