import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TInitAuthState, TUser } from './type';
import { clearLs } from 'helpers/localStorage';

const initialState: TInitAuthState = {
  isAuthenticated: false,
  currentUser: {},
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: TInitAuthState, _) => {
      clearLs();
      return {
        ...state,
        currentUser: initialState.currentUser,
        isAuthenticated: initialState.isAuthenticated,
      };
    },
    saveUser: (state: TInitAuthState, action: PayloadAction<TUser>) => {
      console.log(action.payload);

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
export const { saveUser, setLoading, logout } = actions;
