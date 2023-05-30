import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getDepartments } from 'store/slices/departmentSlice';
import { getPlans } from 'store/slices/planSlice';

type Props = {
  department?: number;
  typePlan?: number;
};
const useService = ({ department, typePlan }: Props) => {
  const dispatch = useDispatch();
  const { departmentList } = useSelector((state: RootState) => state.department);
  const { plans } = useSelector((state: RootState) => state.plan);

  useEffect(() => {
    dispatch(getDepartments({}) as any);
  }, []);

  useEffect(() => {
    if (typePlan || department) dispatch(getPlans({ department, typePlan }) as any);
  }, [department, typePlan]);
  return {
    departmentList,
    plans,
  };
};

export default useService;