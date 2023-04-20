import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDepartments } from 'store/slices/departmentSlice';

const useService = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartments({ page: 1, limit: 1 }) as any);
  }, []);
  return {};
};

export default useService;
