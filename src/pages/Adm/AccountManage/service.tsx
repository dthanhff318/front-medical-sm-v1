import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import {
  createUserDepartment,
  deleteUserDepartment,
  getDepartmentInfoDetail,
} from 'store/slices/departmentSlice';

const useService = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { departmentDetail } = useSelector((state: RootState) => state.department);
  const handleCreateUser = (data) => {
    const extraInfoUser = { ...data, department: id };
    dispatch(createUserDepartment(extraInfoUser) as any);
  };
  const handleDeleteUser = (id: number) => {
    dispatch(deleteUserDepartment(id) as any);
  };
  useEffect(() => {
    dispatch(getDepartmentInfoDetail(id ?? '') as any);
  }, [id]);
  return { departmentDetail, handleCreateUser, handleDeleteUser };
};

export default useService;