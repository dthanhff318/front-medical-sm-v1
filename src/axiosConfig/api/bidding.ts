import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { IndexedObject } from 'types/common';

const biddingApi = {
  updateBidding: (data: any) => {
    return axiosClient.post('/bidding', data);
  },
  getListBidding: (params: any) => {
    return axiosClient.get(`/bidding?${queryString.stringify(params)}`);
  },
  findBidding: (id: string) => {
    return axiosClient.get(`/bidding/supplier/${id}`);
  },
  deleteBidding: (id: number) => {
    return axiosClient.delete(`/bidding/${id}`);
  },
};

export default biddingApi;
