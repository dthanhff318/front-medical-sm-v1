import { parseSearchParams } from 'helpers/functions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from 'store';
import {
  deleteSupplier,
  getSupplier,
  getSupplierInfoDetail,
  updateSupplier,
} from 'store/slices/supplierSlice';
import { TSupplier } from 'types/supplier';
const useService = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const urlQueryParams = parseSearchParams(location.search);
  const supplierState = useSelector((state: RootState) => state.supplier);
  const handleDeleteSupplier = (id: number) => {
    dispatch(deleteSupplier(id) as any);
  };

  useEffect(() => {
    dispatch(getSupplier(urlQueryParams) as any);
  }, []);
  useEffect(() => {
    dispatch(getSupplierInfoDetail(id ?? '') as any);
  }, [id]);

  const handleUpdateSupplier = (data: TSupplier) => {
    dispatch(updateSupplier({ id, ...data }) as any);
  };
  return {
    supplierState,
    handleUpdateSupplier,
    handleDeleteSupplier,
  };
};

export default useService;
