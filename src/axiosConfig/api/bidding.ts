import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';

const biddingApi = {
  updateBidding: (data: any) => {
    return axiosClient.post('/bidding', data);
  },
  getListBidding: () => {
    return axiosClient.get('/bidding');
  },
  findBidding: (id: string) => {
    return axiosClient.get(`/bidding/supplier/${id}`);
  },
};

export default biddingApi;
