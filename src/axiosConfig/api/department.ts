import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { TCreateDepartments, TGetDepartments } from 'store/slices/type';

const departmentApi = {
  getDepartments: (query: TGetDepartments) => {
    return axiosClient.get(`/department?${queryString.stringify(query)}`);
  },
  getDepartmentDetail: (id: string) => {
    return axiosClient.get(`/department/${id}`);
  },
  createDepartments: (data: TCreateDepartments) => {
    return axiosClient.post('/department', data);
  },
  deleteDepartments: (id: number) => {
    return axiosClient.delete(`/department/${id}`);
  },
  updateDepartment: (id: number, data: any) => {
    return axiosClient.patch(`/department/${id}`, data);
  },
};

export default departmentApi;
