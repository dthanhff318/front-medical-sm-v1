import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';

const serviceApi = {
  getservice: () => {
    return axiosClient.get('/service');
  },
  getInfoSupply: () => {
    return axiosClient.get('/service/info');
  },
  getInfoAnalysis: (data: { year: string }) => {
    return axiosClient.post('/service/analysis', data);
  },
};
export default serviceApi;
