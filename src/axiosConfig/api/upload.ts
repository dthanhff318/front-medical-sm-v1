import { axiosClient } from 'axiosConfig/axiosClient';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};
const uploadApi = {
  uploadAvatar: (data: FormData) => {
    return axiosClient.post('/upload/avatar', data, config);
  },
};

export default uploadApi;
