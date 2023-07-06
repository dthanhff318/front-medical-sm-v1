import { getNameById } from 'helpers/functions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import * as XLSX from 'xlsx';

type Props = {};
const useService = () => {
  const { departmentList } = useSelector((state: RootState) => state.department);
  const { groups, suppliers, units } = useSelector((state: RootState) => state.common);
  const handleExportExcel = (data) => {
    const convertData = data.map((e) => ({
      ['Mã']: e.code,
      ['Tên vật tư']: e.name,
      ['Hoạt chất']: e.ingredient,
      ['Đơn vị']: getNameById(e.unit, units),
      ['Nhóm']: getNameById(e.group, groups),
      ['Hao phí']: e.isLoss ? 'Có' : 'Không',
      ['Hãng']: e.brand,
      ['Quốc gia']: e.country,
      ['Công ty']: getNameById(e.company, suppliers),
      ['Hạn sử dụng']: e.dateExpired,
      ['Lô sản xuất']: e.productCode,
      ['Số lượng xuat']: e.quantityExport,
      ['Số lượng nhap']: e.quantityImport,
      ['Số lượng kho']: e.quantity,
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
    link.setAttribute('download', 'data-transfer.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return {
    departmentList,
    groups,
    suppliers,
    units,
    handleExportExcel,
  };
};

export default useService;
