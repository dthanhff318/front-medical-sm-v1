import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { TCreateUser, TCreateStaff } from 'store/slices/type';
import { IndexedObject } from 'types/common';

const userApi = {
  createUser: (data: TCreateUser) => {
    return axiosClient.post('/user', data);
  },
  deleteUser: (id: number) => {
    return axiosClient.delete(`/user/${id}`);
  },
  createStaff: (data: TCreateStaff) => {
    return axiosClient.post('/user/staff', data);
  },
  getListStaff: (params: IndexedObject) => {
    const strParams = queryString.stringify(params);
    return axiosClient.get(`/user/staff?${strParams}`);
  },
};

export default userApi;
