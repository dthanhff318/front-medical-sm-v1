import serviceApi from 'axiosConfig/api/service';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};
const useService = () => {
  const { groups } = useSelector((state: RootState) => state.common);
  const listYear = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    return [
      {
        label: currentYear,
        value: currentYear,
      },
      {
        label: currentYear - 1,
        value: currentYear - 1,
      },
      {
        label: currentYear - 2,
        value: currentYear - 2,
      },
      {
        label: currentYear - 3,
        value: currentYear - 3,
      },
      {
        label: currentYear - 4,
        value: currentYear - 4,
      },
    ];
  };
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [year, setYear] = useState(listYear()[0].value);
  const date = new Date();

  const listGroup = groups.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const getDataAnalysis = async (data) => {
    const res = await serviceApi.getInfoAnalysis(data);
    setDataAnalysis(res.data as any);
  };
  useEffect(() => {
    getDataAnalysis({ year: String(year) });
  }, [year]);

  return { groups, listYear, listGroup, dataAnalysis, setYear };
};

export default useService;
