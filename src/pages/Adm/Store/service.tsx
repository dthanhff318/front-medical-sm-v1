import React, { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplyStore, getSupplyStore, updateSupply } from 'store/slices/storeSlice';
import { parseSearchParams } from 'helpers/functions';
import { useLocation } from 'react-router-dom';
import storeApi from 'axiosConfig/api/store';
import { TSupply } from 'types/supply';

const useService = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { stores, loading, pagination } = useSelector((state: RootState) => state.store);
  const urlQueryParams = parseSearchParams(location.search);
  const getStore = (condition?: any) => {
    dispatch(getSupplyStore(condition) as any);
  };
  const handleAddSupplyToStore = async (data: any) => {
    await storeApi.addSupplyToStore(data);
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
    handleAddSupplyToStore,
  };
};

export default useService;
