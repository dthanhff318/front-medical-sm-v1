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
  const [dataAnalysis, setDataAnalysis] = useState<any>([]);
  const [dataClassify, setDataClassify] = useState<any>([]);
  const [year, setYear] = useState(listYear()[0].value);

  const listGroup = groups.map((e) => ({
    label: e.name,
    value: e.id,
  }));
  const getDataAnalysis = async (data) => {
    const res = await serviceApi.getInfoAnalysis(data);
    const { dataExport, dataImport, dataGroupClassify } = res.data as any;
    setDataClassify(dataGroupClassify);
    const dataExportConvert = dataExport.map((e) => ({
      name: 'Xuất',
      month: e.month,
      count: e.quantity,
    }));
    const dataImportConvert = dataImport.map((e) => ({
      name: 'Nhập',
      month: e.month,
      count: e.quantity,
    }));
    setDataAnalysis([...dataExportConvert, ...dataImportConvert]);
  };
  useEffect(() => {
    getDataAnalysis({ year: String(year) });
  }, [year]);

  return { groups, listYear, listGroup, dataAnalysis, setYear, dataClassify };
};

export default useService;
