import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { TGetSupplier } from 'store/slices/type';

const unitApi = {
  getListUnit: (query: TGetSupplier) => {
    return axiosClient.get(`/unit?${queryString.stringify(query)}`);
  },
  createUnit: (data: any) => {
    return axiosClient.post('/unit', data);
  },
  updateUnit: (id: number,data: any) => {
    return axiosClient.post(`/unit/${id}`, data);
  },
  deleteUnit: (id: number) => {
    return axiosClient.delete(`/unit/${id}`);
  },

};

export default unitApi;
