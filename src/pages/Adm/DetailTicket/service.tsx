import planApi from 'axiosConfig/api/plan';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import MPath from 'routes/routes';
import { RootState } from 'store';
import { getPlanDetail, getPlans, savePlanDetail, savePlans } from 'store/slices/planSlice';

export type EditableCellProps = {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'select' | 'text';
  record: string;
  index: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const useService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { planDetail, loading } = useSelector((state: RootState) => state.plan);

  useEffect(() => {
    if (id) dispatch(getPlanDetail(id) as any);
  }, [id]);

  const handleAcceptTicket = async () => {
    try {
      if (id) {
        await planApi.acceptPlan(id);
        navigate(MPath.ADM_LIST_TICKET);
        toast.success('Duyệt phiếu thành công');
      }
    } catch (err) {
      toast.error('Duyệt phiếu không thành công, thử lại');
    }
  };
  return {
    planDetail,
    loading,
    handleAcceptTicket,
  };
};

export default useService;
