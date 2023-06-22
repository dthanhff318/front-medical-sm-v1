import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from 'axiosConfig/api/service';

type TInitialState = {
  groups: any;
  units: any;
  suppliers: any;
};
const initialState: TInitialState = {
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
      const { groups, units, suppliers } = action.payload;
      return {
        ...state,
        groups,
        units,
        suppliers,
      };
    });
  },
});

export const { actions, reducer: commonReducer } = commonSlice;
export const {} = actions;
