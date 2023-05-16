import serviceApi from 'axiosConfig/api/service';
import React, { useEffect, useState } from 'react';

type Props = {
  value: string;
  selectCompany: string;
};
const useService = () => {
  const [dataService, setdataService] = useState<any>({});
  const getService = async () => {
    await serviceApi.getservice().then((res) => {
      setdataService(res.data);
    });
  };
  useEffect(() => {
    getService();
  }, []);
  return {
    dataService,
  };
};

export default useService;
