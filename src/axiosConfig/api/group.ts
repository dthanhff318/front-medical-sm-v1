import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { TGetSupplier } from 'store/slices/type';

const groupApi = {
  getListGroup: (query: TGetSupplier) => {
    return axiosClient.get(`/group?${queryString.stringify(query)}`);
  },
  createGroup: (data: any) => {
    return axiosClient.post('/group', data);
  },
  updateGroup: (id: number,data: any) => {
    return axiosClient.post(`/group/${id}`, data);
  },
  deleteGroup: (id: number) => {
    return axiosClient.delete(`/group/${id}`);
  },
};

export default groupApi;
