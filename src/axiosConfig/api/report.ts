import { axiosClient } from 'axiosConfig/axiosClient';
import { TGetDataReport } from 'store/slices/type';

const reportApi = {
  getDataReport: (data: TGetDataReport) => {
    return axiosClient.post('/report/export-department', data);
  },
  getDataReportInventory: (data: TGetDataReport) => {
    return axiosClient.post('/report/inventory-store', data);
  },
};

export default reportApi;
