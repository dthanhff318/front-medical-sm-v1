import { parseSearchParams } from 'helpers/functions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';
import {
  createNewDepartments,
  deleteDepartment,
  getDepartments,
} from 'store/slices/departmentSlice';
import { TCreateDepartments } from 'store/slices/type';

const useService = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const urlQueryParams = parseSearchParams(location.search);
  const departmentState = useSelector((state: RootState) => state.department);

  const onCreateDepartment = (data: TCreateDepartments) => {
    dispatch(createNewDepartments(data) as any);
  };
  const handleDeleteDepartment = (id: number) => {
    dispatch(deleteDepartment(id) as any);
  };

  useEffect(() => {
    dispatch(getDepartments(urlQueryParams) as any);
  }, [location]);
  return {
    departmentState,
    urlQueryParams,
    onCreateDepartment,
    handleDeleteDepartment,
  };
};

export default useService;
