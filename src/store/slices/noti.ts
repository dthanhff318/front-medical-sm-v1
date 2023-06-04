import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitNotiState } from './type';
import { toast } from 'react-toastify';
import { IndexedObject } from 'types/common';
import notiApi from 'axiosConfig/api/noti';

const initialState: TInitNotiState = {
  loading: false,
  noti: [],
};
export const getNotis = createAsyncThunk(
  'noti/getNoti',
  async (params: IndexedObject, thunkApi) => {
    try {
      const res = await notiApi.getNotis(params);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

const notiSlice = createSlice({
  name: 'noti',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getNotis.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNotis.fulfilled, (state, action) => {
      state.noti = action.payload;
      state.loading = false;
    });
  },
});

export const { actions, reducer: notiReducer } = notiSlice;
export const {} = actions;
