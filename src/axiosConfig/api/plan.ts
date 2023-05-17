import { axiosClient } from 'axiosConfig/axiosClient';

const planApi = {
  sendPlan: (data: any) => {
    return axiosClient.post('/plan', data);
  },
};

export default planApi;
