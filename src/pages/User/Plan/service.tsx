import React, { useContext, useEffect, useState } from 'react';
import storeApi from 'axiosConfig/api/store';
import { useDispatch, useSelector } from 'react-redux';
import planApi from 'axiosConfig/api/plan';
import { RootState } from 'store';
import { toast } from 'react-toastify';
import SocketContext from 'context/socketContext';

type Props = {
  value: string;
};
const useService = ({ value }: Props) => {
  const { socket } = useContext(SocketContext);
  const [listSupply, setListSupply] = useState<any>([]);
  const [loadSend, setLoadSend] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { currentUser } = useSelector((state: RootState) => state.auth);

  const findSupply = async (condition: { q: string }) => {
    const res = await storeApi.getSupplyFromStore({ ...condition, limit: 10000 });
    setListSupply(res.data.results);
  };
  const handleSendPlan = async (data: any) => {
    try {
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
      toast.success('Gửi phiếu thành công !');
      setLoadSend(false);
    } catch (err) {
      toast.error('Gửi phiếu thất bại !');
    }
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
    socket,
  };
};

export default useService;
