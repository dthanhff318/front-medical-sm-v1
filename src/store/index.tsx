import { configureStore } from '@reduxjs/toolkit';
import { departmentReducer } from './slices/departmentSlice';
import { authReducer } from './slices/authSlice';
import { biddingReducer } from './slices/biddingSlice';
import { supplierReducer } from './slices/supplierSlice';
import { storeReducer } from './slices/storeSlice';
import { planReducer } from './slices/planSlice';
import { notiReducer } from './slices/noti';
import { commonReducer } from './slices/commonSlice';
import { unitReducer } from './slices/unitSlice';
import { groupReducer } from './slices/groupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    department: departmentReducer,
    bidding: biddingReducer,
    supplier: supplierReducer,
    store: storeReducer,
    plan: planReducer,
    noti: notiReducer,
    common: commonReducer,
    unit: unitReducer,
    group: groupReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
