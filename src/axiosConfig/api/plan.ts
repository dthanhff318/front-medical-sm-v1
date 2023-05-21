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
};

export default planApi;
