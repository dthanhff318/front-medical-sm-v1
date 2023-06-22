import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getDepartments } from 'store/slices/departmentSlice';
import { getPlans } from 'store/slices/planSlice';

type Props = {};
const useService = () => {
  const dispatch = useDispatch();
  const { departmentList } = useSelector((state: RootState) => state.department);
  const { groups } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    dispatch(getDepartments({}) as any);
  }, []);

  return {
    departmentList,
    groups,
  };
};

export default useService;
