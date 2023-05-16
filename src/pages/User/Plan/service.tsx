import React, { useEffect, useState } from 'react';
import storeApi from 'axiosConfig/api/store';
import { useDispatch, useSelector } from 'react-redux';
import planApi from 'axiosConfig/api/plan';
import { RootState } from 'store';

type Props = {
  value: string;
};
const useService = ({ value }: Props) => {
  const dispatch = useDispatch();
  const [listSupply, setListSupply] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const { currentUser } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);
  const findSupply = async (condition: { q: string }) => {
    const res = await storeApi.getSupplyFromStore(condition);
    setListSupply(res.data);
  };

  useEffect(() => {
    findSupply({ q: search });
  }, [search]);

  const handleSendPlan = async (data: any) => {
    await planApi.sendPlan(data);
  };
  return {
    search,
    listSupply,
    handleSendPlan,
    currentUser,
  };
};

export default useService;
