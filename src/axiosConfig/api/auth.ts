import { axiosClient } from 'axiosConfig/axiosClient';
import { TLoginData } from 'store/slices/type';

const authApi = {
  login: (body: TLoginData) => {
    return axiosClient.post('/auth/login', body);
  },
};

export default authApi;
