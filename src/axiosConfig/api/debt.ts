import { axiosClient } from 'axiosConfig/axiosClient';

const debtApi = {
  getListDebt: (data: any) => {
    return axiosClient.post('/debt', data);
  },
};

export default debtApi;
