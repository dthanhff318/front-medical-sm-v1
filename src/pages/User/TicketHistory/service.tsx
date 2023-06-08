import React, { useEffect, useState } from 'react';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplyStore, getStoreOfDepartment } from 'store/slices/storeSlice';
import { parseSearchParams } from 'helpers/functions';
import { useLocation } from 'react-router-dom';
import { getTicketDepartment } from 'store/slices/planSlice';

const useService = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { plans, loading, pagination } = useSelector((state: RootState) => state.plan);
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const urlQueryParams = parseSearchParams(location.search);

  useEffect(() => {
    if (currentUser.department)
      dispatch(
        getTicketDepartment({
          id: currentUser.department,
          params: urlQueryParams,
        }) as any,
      );
  }, [location]);
  return {
    plans,
    loading,
    urlQueryParams,
    pagination,
  };
};

export default useService;
