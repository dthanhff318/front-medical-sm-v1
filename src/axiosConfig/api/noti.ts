import { axiosClient } from 'axiosConfig/axiosClient';
import queryString from 'query-string';
import { IndexedObject } from 'types/common';

const notiApi = {
  getNotis: (query: IndexedObject) => {
    return axiosClient.get(`/noti?${queryString.stringify(query)}`);
  },
  markAsSeenNoti: (idNoti: number) => {
    return axiosClient.patch(`/noti/mark-as-seen`, { idNoti });
  },
};

export default notiApi;
