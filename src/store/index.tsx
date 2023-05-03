import { configureStore } from '@reduxjs/toolkit';
import { departmentReducer } from './slices/departmentSlice';
import { authReducer } from './slices/authSlice';
import { biddingReducer } from './slices/biddingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    bidding: biddingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
