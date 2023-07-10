import reportApi from 'axiosConfig/api/report';
import { getUserFromLs } from 'helpers/localStorage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { IndexedObject } from 'types/common';

const useService = () => {
  const { groups, units, suppliers } = useSelector((state: RootState) => state.common);
  const [data, setData] = useState<IndexedObject>([]);
  const userData = getUserFromLs();
  const handleGetReport = async (data) => {
    const { timeRange, type } = data;
    const timeConvert = timeRange.map((e) => e.format('DD MM YY'));
    const res = await reportApi.getReportForDepartment({
      timeRange: timeConvert,
      type,
      department: userData.department,
    });
    console.log(res.data);
    // setData(res.data);
  };
  const handleExportExcel = (data) => {};

  return { data, groups, units, suppliers, handleExportExcel, handleGetReport };
};

export default useService;
