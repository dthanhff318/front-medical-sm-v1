import React, { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { getSupplyStore } from 'store/slices/storeSlice';

const useService = () => {
  const dispatch = useDispatch();
  const { stores, loading } = useSelector((state: RootState) => state.store);
  const getStore = (condition?: any) => {
    dispatch(getSupplyStore(condition) as any);
  };
  useEffect(() => {
    getStore();
  }, []);
  return {
    stores,
    loading,
    getStore,
  };
};

export default useService;
