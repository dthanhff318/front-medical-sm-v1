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
  deleteTicket: (id: number) => {
    return axiosClient.delete(`/plan/${id}`);
  },
  // Department ticket
  getPlansDepartment: (id: string, params: IndexedObject) => {
    return axiosClient.get(`/plan/department/${id}?${queryString.stringify(params)}`);
  },
};

export default planApi;
