import { axiosClient } from 'axiosConfig/axiosClient';
import { TLoginData } from 'store/slices/type';

const authApi = {
  login: (body: TLoginData) => {
    return axiosClient.post('/auth/login', body);
  },
  checkAuth: (body: { refreshToken: string }) => {
    return axiosClient.post('/auth/check-auth', body);
  },
};

export default authApi;
