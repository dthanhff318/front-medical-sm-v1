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
  getPlanDetail: (id: number) => {
    return axiosClient.get(`/plan/${id}`);
  },
};

export default planApi;
