import { configureStore } from '@reduxjs/toolkit';
import { departmentReducer } from './slices/departmentSlice';
import { authReducer } from './slices/authSlice';
import { biddingReducer } from './slices/biddingSlice';
import { supplierReducer } from './slices/supplierSlice';
import { storeReducer } from './slices/storeSlice';
import { planReducer } from './slices/planSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    bidding: biddingReducer,
    supplier: supplierReducer,
    store: storeReducer,
    plan: planReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
