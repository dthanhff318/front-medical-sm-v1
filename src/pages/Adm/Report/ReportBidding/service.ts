import { getNameById } from 'helpers/functions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getDepartments } from 'store/slices/departmentSlice';
import * as XLSX from 'xlsx';

type Props = {};
const useService = () => {
  const dispatch = useDispatch();
  const { departmentList } = useSelector((state: RootState) => state.department);
  const { groups, units, suppliers } = useSelector((state: RootState) => state.common);

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
      ['Don gia']: e.unitPrice,
      ['Tong gia tien']: e.totalPrice,
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
    link.setAttribute('download', 'bidding-report.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    dispatch(getDepartments({}) as any);
  }, []);

  return {
    departmentList,
    groups,
    handleExportExcel,
    units,
    suppliers,
  };
};

export default useService;
