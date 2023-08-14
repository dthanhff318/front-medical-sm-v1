import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'store';
import {
  createUserDepartment,
  deleteUserDepartment,
  getDepartmentInfoDetail,
  updateDepartment,
} from 'store/slices/departmentSlice';
import { TDepartment } from 'types/department';
import { IndexedObject } from 'types/common';
import departmentApi from 'axiosConfig/api/department';

const useService = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { departmentDetail, loading } = useSelector((state: RootState) => state.department);
  const handleCreateUser = (data) => {
    const extraInfoUser = { ...data, department: id };
    dispatch(createUserDepartment(extraInfoUser) as any);
  };
  const handleDeleteUser = (id: number) => {
    dispatch(deleteUserDepartment(id) as any);
  };
  const handleUpdateDepartment = (data: TDepartment) => {
    dispatch(updateDepartment({ id, ...data }) as any);
  };

  const makeAsOwner = async (idUser: number) => {
    await departmentApi.updateDepartment( Number(id), { owner: idUser });
    // dispatch(updateDepartment({ id, owner: idUser }) as any);
    dispatch(getDepartmentInfoDetail(id ?? '') as any);
  };
  useEffect(() => {
    dispatch(getDepartmentInfoDetail(id ?? '') as any);
  }, [id]);
  return {
    departmentDetail,
    handleCreateUser,
    handleDeleteUser,
    makeAsOwner,
    loading,
    handleUpdateDepartment,
  };
};
export default useService;
