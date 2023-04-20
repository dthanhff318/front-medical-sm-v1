import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { createNewDepartments, getDepartments } from 'store/slices/departmentSlice';
import { TCreateDepartments } from 'store/slices/type';

const useService = () => {
  const dispatch = useDispatch();
  const { departmentList } = useSelector((state: RootState) => state.department);
  const departmentListMapping = departmentList.map((d) => ({
    ...d,
    key: d.id,
    owner: d.owner ? d.owner.displayName : '',
  }));
  const onCreateDepartment = (data: TCreateDepartments) => {
    dispatch(createNewDepartments(data) as any);
  };
  useEffect(() => {
    dispatch(getDepartments({ page: 1, limit: 10 }) as any);
  }, []);
  return {
    departmentListMapping,
    onCreateDepartment,
  };
};

export default useService;
