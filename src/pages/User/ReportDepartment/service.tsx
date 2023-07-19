import reportApi from 'axiosConfig/api/report';
import { getNameById } from 'helpers/functions';
import { getUserFromLs } from 'helpers/localStorage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { IndexedObject } from 'types/common';
import * as XLSX from 'xlsx';

const useService = () => {
  const { groups, units, suppliers } = useSelector((state: RootState) => state.common);
  const [data, setData] = useState<IndexedObject[]>([]);
  const userData = getUserFromLs();
  const handleGetReport = async (data) => {
    const { timeRange, type } = data;
    const timeConvert = timeRange.map((e) => e.format('DD MM YY'));
    const res = await reportApi.getReportForDepartment({
      timeRange: timeConvert,
      type,
      department: userData.department,
    });
    setData(res.data as any);
  };
  const handleExportExcel = (data) => {
    const convertData = data.map((e) => ({
      ['Mã']: e.code,
      ['Tên vật tư']: e.name,
      ['Hoạt chất']: e.ingredient,
      ['Đơn vị']: getNameById(e.unit, units),
      ['Nhóm']: getNameById(e.group, groups),
      ['Hao phí']: e.isLoss ? 'Có' : 'Không',
      ['Model']: e.brand,
      ['Quốc gia']: e.country,
      ['Công ty']: getNameById(e.company, suppliers),
      ['Hạn sử dụng']: e.dateExpired,
      ['Lô sản xuất']: e.productCode,
      ['Số lượng']: e.quantity,
    }));

    const worksheet = XLSX.utils.json_to_sheet(convertData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { data, groups, units, suppliers, handleExportExcel, handleGetReport };
};

export default useService;
