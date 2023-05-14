import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';

const serviceApi = {
  
  getservice: () => {
    return axiosClient.get('/service');
  },
};
export default serviceApi;