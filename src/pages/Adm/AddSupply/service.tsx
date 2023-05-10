import storeApi from 'axiosConfig/api/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findBiddingWithSupplier } from 'store/slices/biddingSlice';
import { findSupplier } from 'store/slices/supplierSlice';

type Props = {
  value: string;
  selectCompany: string;
};
const useService = ({ value, selectCompany }: Props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  const findListSupplier = () => {
    dispatch(findSupplier(search) as any);
  };

  const findBidding = () => {
    dispatch(findBiddingWithSupplier(selectCompany) as any);
  };

  useEffect(() => {
    findListSupplier();
  }, [search]);

  useEffect(() => {
    findBidding();
  }, [selectCompany]);

  const handleAddSupplyToStore = async (data: any) => {
    await storeApi.addSupplyToStore(data);
  };
  return {
    search,
    handleAddSupplyToStore,
  };
};

export default useService;
