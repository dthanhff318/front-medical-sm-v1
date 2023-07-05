import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { getDepartments } from 'store/slices/departmentSlice';
import { getPlans } from 'store/slices/planSlice';
import * as XLSX from 'xlsx';

type Props = {};
const useService = () => {
  const dispatch = useDispatch();
  const { departmentList } = useSelector((state: RootState) => state.department);
  const { groups } = useSelector((state: RootState) => state.common);

  const handleExportExcel = (data) => {
    const convertData = data.map((e) => ({
      ['Mã']: e.code,
      ['Tên vật tư']: e.name,
      ['Hoạt chất']: e.ingredient,
      ['Đơn vị']: e.unit.name,
      ['Nhóm']: e.group.name,
      ['Hao phí']: e.isLoss ? 'Có' : 'Không',
      ['Hãng']: e.brand,
      ['Quốc gia']: e.country,
      ['Công ty']: e.company.name,
      ['Hạn sử dụng']: e.dateExpired,
      ['Lô sản xuất']: e.productCode,
      ['Số lượng xuất']: e.quantityExpect,
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
    link.setAttribute('download', 'data-export.xlsx');
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
  };
};

export default useService;
