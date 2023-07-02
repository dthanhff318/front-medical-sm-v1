import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from 'axiosConfig/api/service';

type TInitialState = {
  groups: any;
  units: any;
  suppliers: any;
  departments: any;
};
const initialState: TInitialState = {
  groups: [],
  units: [],
  suppliers: [],
  departments: [],
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
      const { groups, units, suppliers, departments } = action.payload;
      return {
        ...state,
        groups,
        units,
        suppliers,
        departments,
      };
    });
  },
});

export const { actions, reducer: commonReducer } = commonSlice;
export const {} = actions;
