import React, { useEffect, useState } from 'react';
import storeApi from 'axiosConfig/api/store';
import { useDispatch, useSelector } from 'react-redux';
import planApi from 'axiosConfig/api/plan';
import { RootState } from 'store';
import { toast } from 'react-toastify';

type Props = {
  value: string;
};
const useService = ({ value }: Props) => {
  const dispatch = useDispatch();
  const [listSupply, setListSupply] = useState<any>([]);
  const [loadSend, setLoadSend] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const findSupply = async (condition: { q: string }) => {
    const res = await storeApi.getSupplyFromStore(condition);
    setListSupply(res.data.results);
  };
  const handleSendPlan = async (data: any) => {
    setLoadSend(true);
    if (!data.typePlan) {
      toast.error('Vui lòng chọn loại phiếu !');
      setLoadSend(false);
      return;
    }
    if (!data.planList.length) {
      toast.error('Danh sách vật tư đang trống !');
      setLoadSend(false);
      return;
    }
    await planApi.sendPlan(data);
    setLoadSend(false);
  };

  // Side effect
  useEffect(() => {
    findSupply({ q: search });
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value);
    }, 800);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return {
    search,
    listSupply,
    handleSendPlan,
    currentUser,
    loadSend,
  };
};

export default useService;
