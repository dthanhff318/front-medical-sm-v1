import { configureStore } from '@reduxjs/toolkit';
import { departmentReducer } from './slices/departmentSlice';

export const store = configureStore({
  reducer: {
    department: departmentReducer,
  },
});
