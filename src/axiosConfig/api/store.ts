import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { IndexedObject } from 'types/common';

const storeApi = {
  getSupplyFromStore: (condition: IndexedObject) => {
    const queryStr = queryString.stringify(condition);
    return axiosClient.get(`/store?${queryStr}`);
  },
  addSupplyToStore: (data: any) => {
    return axiosClient.post('/store/add', data);
  },
  deleteSupply: (id: number) => {
    return axiosClient.delete(`/store/${id}`);
  },
  updateSupply: (id: number, data: any) => {
    return axiosClient.patch(`/store/${id}`, data);
  },
  // department
  getStoreOfDepartment: (id: number, condition: IndexedObject) => {
    const queryStr = queryString.stringify(condition);
    return axiosClient.get(`/store/department/${id}?${queryStr}`);
  },
};

export default storeApi;
