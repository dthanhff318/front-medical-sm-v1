import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitNotiState } from './type';
import { toast } from 'react-toastify';
import { IndexedObject } from 'types/common';
import notiApi from 'axiosConfig/api/noti';

const initialState: TInitNotiState = {
  loading: false,
  notis: [],
  numberSeen: 0,
  dataFetch: { offset: 1, hasMore: true, firstFetch: true },
};
export const getNotis = createAsyncThunk(
  'noti/getNoti',
  async (params: IndexedObject, thunkApi: any) => {
    try {
      const res = await notiApi.getNotis(params);
      return res.data;
    } catch (err: any) {
      toast.error(`Co loi xay ra, vui long thu lai`);
      return thunkApi.rejectWithValue({});
    }
  },
);

export const markAsReadNoti = createAsyncThunk(
  'noti/markAsReadNoti',
  async (idNoti: number, thunkApi: any) => {
    try {
      const res = await notiApi.markAsSeenNoti(idNoti);
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
    setDataFetch: (state, action) => {
      state.dataFetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotis.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNotis.fulfilled, (state, action) => {
      const { listNoti, unread, isHasMore } = action.payload;
      return {
        ...state,
        loading: false,
        notis: [...state.notis, ...listNoti],
        numberSeen: unread,
        dataFetch: {
          firstFetch: false,
          hasMore: isHasMore,
          offset: state.dataFetch.offset + 1,
        },
      };
    });
    builder.addCase(markAsReadNoti.fulfilled, (state, action) => {
      const updateList = state.notis.map((n) => (n.id === action.payload.id ? action.payload : n));
      return {
        ...state,
        notis: updateList,
        numberSeen: state.numberSeen - 1,
      };
    });
  },
});

export const { actions, reducer: notiReducer } = notiSlice;
export const { setDataFetch } = actions;
