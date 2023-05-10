import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';

const storeApi = {
  getSupplyFromStore: (condition: any) => {
    const queryStr = queryString.stringify(condition);
    return axiosClient.get(`/store?${queryStr}`);
  },
  addSupplyToStore: (data: any) => {
    return axiosClient.post('/store/add', data);
  },
};

export default storeApi;
