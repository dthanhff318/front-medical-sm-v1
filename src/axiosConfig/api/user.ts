import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { TCreateUser } from 'store/slices/type';

const userApi = {
  createUser: (data: TCreateUser) => {
    return axiosClient.post('/user', data);
  },
  deleteUser: (id: number) => {
    return axiosClient.delete(`/user/${id}`);
  },
};

export default userApi;
