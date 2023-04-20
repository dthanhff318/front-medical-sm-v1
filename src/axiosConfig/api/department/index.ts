import { axiosClient } from 'axiosConfig/axiosClient';
import { TGetDepartments } from './type';
import queryString from 'query-string';

const departmentApi = {
  getDepartments: (query: TGetDepartments) => {
    return axiosClient.get(`/department?${queryString.stringify(query)}`);
  },
};

export default departmentApi;
