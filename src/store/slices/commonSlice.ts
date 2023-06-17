import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from 'axiosConfig/api/service';

const initialState: any = {
  groups: [],
  units: [],
  suppliers: [],
};

export const fetchInfoCommon = createAsyncThunk(
  'common/fetchInfoCommon',
  async (params: any, thunkApi) => {
    try {
      const res = await serviceApi.getInfoSupply();
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue({});
    }
  },
);
const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInfoCommon.fulfilled, (state, action) => {
      const { groups, inits, suppliers } = action.payload;
      return {
        ...state,
        groups,
        inits,
        suppliers,
      };
    });
  },
});

export const { actions, reducer: commonReducer } = commonSlice;
export const {} = actions;
