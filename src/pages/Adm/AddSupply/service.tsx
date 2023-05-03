import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { findBidding } from 'store/slices/biddingSlice';
import {
  createNewDepartments,
  deleteDepartment,
  getDepartments,
} from 'store/slices/departmentSlice';
import { TCreateDepartments } from 'store/slices/type';

const useService = ({ value }: { value: string }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  const [biddingFind, setBiddingFind] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  const getListFindBidding = () => {
    dispatch(findBidding(search) as any);
  };

  useEffect(() => {
    getListFindBidding();
  }, [search]);
  return {
    search,
  };
};

export default useService;
