import React, { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplyStore, getStoreOfDepartment } from 'store/slices/storeSlice';
import { parseSearchParams } from 'helpers/functions';
import { useLocation } from 'react-router-dom';

const useService = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { stores, storeDepartment, loading, pagination } = useSelector(
    (state: RootState) => state.store,
  );
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const urlQueryParams = parseSearchParams(location.search);

  const getStore = (condition?: any) => {
    dispatch(getStoreOfDepartment({ ...condition, id: currentUser.department }) as any);
  };

  const onDeleteSupplyStore = (id: number) => dispatch(deleteSupplyStore(id) as any);

  useEffect(() => {
    if (currentUser.department)
      getStore({
        id: currentUser.department,
        condition: urlQueryParams,
      });
  }, [currentUser.department]);
  return {
    storeDepartment,
    loading,
    urlQueryParams,
    pagination,
    getStore,
    onDeleteSupplyStore,
  };
};

export default useService;
