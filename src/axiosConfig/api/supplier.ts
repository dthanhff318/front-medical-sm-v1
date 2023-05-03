import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';

const supplierApi = {
  updatesupplier: (data: any) => {
    return axiosClient.post('/supplier', data);
  },
  getListsupplier: () => {
    return axiosClient.get('/supplier');
  },
  findsupplier: (value: string) => {
    return axiosClient.get(`/supplier/search?q=${value}`);
  },
};

export default supplierApi;
