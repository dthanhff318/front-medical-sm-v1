import { configureStore } from '@reduxjs/toolkit';
import { departmentReducer } from './slices/departmentSlice';
import { authReducer } from './slices/authSlice';
import { biddingReducer } from './slices/biddingSlice';
import { supplierReducer } from './slices/supplierSlice';
import { storeReducer } from './slices/storeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    bidding: biddingReducer,
    supplier: supplierReducer,
    store: storeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
