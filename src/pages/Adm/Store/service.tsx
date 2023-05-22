import React, { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplyStore, getSupplyStore } from 'store/slices/storeSlice';
import { parseSearchParams } from 'helpers/functions';
import { useLocation } from 'react-router-dom';

const useService = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { stores, loading, pagination } = useSelector((state: RootState) => state.store);
  const urlQueryParams = parseSearchParams(location.search);

  const getStore = (condition?: any) => {
    dispatch(getSupplyStore(condition) as any);
  };

  const onDeleteSupplyStore = (id: number) => dispatch(deleteSupplyStore(id) as any);
  useEffect(() => {
    getStore(urlQueryParams);
  }, [location]);
  return {
    stores,
    loading,
    urlQueryParams,
    pagination,
    getStore,
    onDeleteSupplyStore,
  };
};

export default useService;
