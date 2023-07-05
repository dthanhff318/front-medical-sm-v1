import { parseSearchParams } from 'helpers/functions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'store';

import { TCreateStaff } from 'store/slices/type';
import { TUser } from 'types/user';
import userApi from 'axiosConfig/api/user';
import { toast } from 'react-toastify';

const useService = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [listStaff, setListStaff] = useState<TUser[]>([]);
  const [value, setValue] = useState('');
  const onSearch = (value: string) => {
    setValue(value);
  };

  const urlQueryParams = parseSearchParams(location.search);
  const departmentState = useSelector((state: RootState) => state.department);

  const onCreateStaff = async (data: TCreateStaff) => {
    try {
      setLoading(true);
      const res = await userApi.createStaff(data);
      const updateList = [...listStaff, res.data];
      setListStaff(updateList);
      toast.success('Them moi nhan vien thanh cong');
    } catch (err) {
      toast.error('Co loi xay ra');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteStaff = async (id: number) => {
    await userApi.deleteUser(id);
    const filterList = listStaff.filter((e) => e.id !== id);
    setListStaff(filterList);
  };

  const getStaffs = async (params) => {
    const res = await userApi.getListStaff(params);
    setListStaff(res.data);
  };
  useEffect(() => {
    getStaffs({ q: value });
  }, [value]);
  return {
    loading,
    onCreateStaff,
    handleDeleteStaff,
    onSearch,
    listStaff,
  };
};

export default useService;
