import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitAuthState, TUser } from './type';

const initialState: TInitAuthState = {
  isAuthenticated: false,
  currentUser: {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state: TInitAuthState, action: PayloadAction<TUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    setLoading: (state: TInitAuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions, reducer: authReducer } = authSlice;
export const { saveUser, setLoading } = actions;
