import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { TInitAuthState, TLoginData, TUser } from './type';
import authApi from 'axiosConfig/api/auth';
import { saveUserToLs } from 'helpers/localStorage';
import { saveToken } from 'helpers/localStorage';

const initialState: TInitAuthState = {
  isAuthenticated: false,
  currentUser: {},
  loading: false,
};

// Login
export const login = createAsyncThunk('auth/login', async (body: TLoginData, thunkApi) => {
  try {
    const res = await authApi.login(body);
    const { accessToken, refreshToken, ...dataUser } = res.data as any;
    thunkApi.dispatch(saveUser(dataUser as TUser));
    saveUserToLs(dataUser);
    saveToken('accessToken', accessToken);
    saveToken('refreshToken', refreshToken);
  } catch (err: any) {
    toast.error(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser: (state: TInitAuthState, action: PayloadAction<TUser>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {},
});

export const { actions, reducer: authReducer } = authSlice;
export const { saveUser } = actions;
