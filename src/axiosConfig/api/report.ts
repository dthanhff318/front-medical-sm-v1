import { axiosClient } from 'axiosConfig/axiosClient';
import { TGetDataReport } from 'store/slices/type';

const reportApi = {
  getDataReport: (data: TGetDataReport) => {
    return axiosClient.post('/report/export-department', data);
  },
  getDataImport: (data: TGetDataReport) => {
    return axiosClient.post('/report/import-department', data);
  },
  getDataReportInventory: (data: TGetDataReport) => {
    return axiosClient.post('/report/inventory-store', data);
  },
  getReportBidding: (data: TGetDataReport) => {
    return axiosClient.post('/report/bidding', data);
  },
};

export default reportApi;
