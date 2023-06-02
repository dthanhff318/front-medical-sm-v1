import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { IndexedObject } from 'types/common';

const planApi = {
  sendPlan: (data: any) => {
    return axiosClient.post('/plan', data);
  },
  getPlans: (params: IndexedObject) => {
    return axiosClient.get(`/plan?${queryString.stringify(params)}`);
  },
  getPlanDetail: (id: string) => {
    return axiosClient.get(`/plan/${id}`);
  },
  acceptPlan: (id: string) => {
    return axiosClient.get(`/plan/accept/${id}`);
  },
  refundPlan: (id: string) => {
    return axiosClient.get(`/plan/refund/${id}`);
  },
};

export default planApi;
