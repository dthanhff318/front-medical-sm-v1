import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { TGetSupplier } from 'store/slices/type';

const supplierApi = {
  updatesupplier: (data: any) => {
    return axiosClient.post('/supplier', data);
  },
  getListsupplier: (query: TGetSupplier) => {
    return axiosClient.get(`/supplier?${queryString.stringify(query)}`);
  },
  findsupplier: (value: string) => {
    return axiosClient.get(`/supplier/search?q=${value}`);
  },
  updateSupplier: (id: number, data: any) => {
    return axiosClient.patch(`/supplier/${id}`, data);
  },
  deleteSupplier: (id: number) => {
    return axiosClient.delete(`/supplier/${id}`);
  },
  getSupplierDetail: (id: string) => {
    return axiosClient.get(`/supplier/${id}`);
  },
};

export default supplierApi;
