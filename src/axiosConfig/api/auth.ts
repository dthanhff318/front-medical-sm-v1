import { axiosClient } from 'axiosConfig/axiosClient';
import { TLoginData } from 'store/slices/type';

const authApi = {
  login: (body: TLoginData) => {
    return axiosClient.post('/auth/login', body);
  },
  checkAuth: (body: { refreshToken: string }) => {
    return axiosClient.post('/auth/check-auth', body);
  },
  getCurrentUser: () => {
    return axiosClient.get('/auth/current-user');
  },
};

export default authApi;
