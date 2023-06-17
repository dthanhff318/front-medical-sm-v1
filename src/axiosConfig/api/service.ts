import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';

const serviceApi = {
  getservice: () => {
    return axiosClient.get('/service');
  },
  getInfoSupply: () => {
    return axiosClient.get('/service/info');
  },
};
export default serviceApi;
