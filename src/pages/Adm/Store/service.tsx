import React, { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplyStore, getSupplyStore, updateSupply } from 'store/slices/storeSlice';
import { parseSearchParams } from 'helpers/functions';
import { useLocation } from 'react-router-dom';
import storeApi from 'axiosConfig/api/store';
import { getSupplier } from 'store/slices/supplierSlice';
import { fetchInfoCommon } from 'store/slices/commonSlice';

type Props = {
  value: string;
};
const useService = ({ value }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useState<string>('');
  const { stores, loading, pagination } = useSelector((state: RootState) => state.store);
  const urlQueryParams = parseSearchParams(location.search);
  const getStore = (condition?: any) => {
    dispatch(getSupplyStore(condition) as any);
  };
  const handleAddSupplyToStore = async (data: any) => {
    await storeApi.addSupplyToStore(data);
  };

  const handleUpdateSupplyStore = (data) => {
    dispatch(
      updateSupply({
        ...data,
      }) as any,
    );
  };
  const onDeleteSupplyStore = (id: number) => dispatch(deleteSupplyStore(id) as any);
  useEffect(() => {
    getStore(urlQueryParams);
  }, [location]);

  useEffect(() => {
    dispatch(getSupplier({ q: search }) as any);
  }, [search]);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearch(value);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [value]);
  return {
    stores,
    loading,
    urlQueryParams,
    pagination,
    getStore,
    onDeleteSupplyStore,
    handleAddSupplyToStore,
    handleUpdateSupplyStore,
  };
};

export default useService;
