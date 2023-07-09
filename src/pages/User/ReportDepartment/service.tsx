import userApi from 'axiosConfig/api/user';
import { getUserFromLs } from 'helpers/localStorage';
import React, { useEffect, useState } from 'react';
import { IndexedObject } from 'types/common';

type Props = {};

const useService = (props: Props) => {
  const [dataDepartment, setDataDepartment] = useState<IndexedObject>({});
  const userData = getUserFromLs();
  const getData = async (id) => {
    const res = await userApi.getListStaffDepartment(id);
    setDataDepartment(res.data);
  };

  useEffect(() => {
    getData(userData.department);
  }, []);
  return { dataDepartment };
};

export default useService;
