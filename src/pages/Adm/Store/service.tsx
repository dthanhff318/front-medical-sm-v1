import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSupplyStore, getSupplyStore, updateSupply } from 'store/slices/storeSlice';
import { parseSearchParams } from 'helpers/functions';
import { useLocation } from 'react-router-dom';
import storeApi from 'axiosConfig/api/store';
import { getSupplier } from 'store/slices/supplierSlice';

type Props = {
  value: string;
};
const useService = ({ value }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [search, setSearch] = useState<string>('');
  const { stores, loading, pagination } = useSelector((state: RootState) => state.store);
  const urlQueryParams = parseSearchParams(location.search);
  const getStore = (condition?: any) => {
    dispatch(getSupplyStore(condition) as any);
  };
  const handleAddSupplyToStore = async (data: any) => {
    await storeApi.addSupplyToStore(data);
  };

  const handleUpdateSupplyStore = (data) => {
    dispatch(
      updateSupply({
        ...data,
      }) as any,
    );
  };
  const onDeleteSupplyStore = (id: number) => dispatch(deleteSupplyStore(id) as any);

  const handleExcelDownload = async () => {
    try {
      const res = await storeApi.getSupplyFromStore({ limit: 1000000 });
      const convertData = res.data.results.map((e) => ({
        ['Tên vật tư']: e.name,
        ['Hoạt chất']: e.ingredient,
        ['Đơn vị']: e.unit.name,
        ['Nhóm']: e.group.name,
        ['Hao phí']: e.isLoss ? 'Có' : 'Không',
        ['Model']: e.brand,
        ['Quốc gia']: e.country,
        ['Công ty']: e.company.name,
        ['Hạn sử dụng']: e.dateExpired,
        ['Lô sản xuất']: e.productCode,
        ['Mã thầu']: e.codeBidding,
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
      link.setAttribute('download', 'data-store.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStore({});
  }, []);

  useEffect(() => {
    dispatch(getSupplier({ q: search }) as any);
  }, [search]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSearch(value);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [value]);

  return {
    stores,
    loading,
    urlQueryParams,
    pagination,
    getStore,
    onDeleteSupplyStore,
    handleAddSupplyToStore,
    handleUpdateSupplyStore,
    handleExcelDownload,
  };
};

export default useService;
