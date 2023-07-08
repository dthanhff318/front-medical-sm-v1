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
  uploadPhotoSupplier: (data: FormData, id: number) => {
    return axiosClient.post(`/upload/supplier/${id}`, data, config);
  },
};

export default uploadApi;
