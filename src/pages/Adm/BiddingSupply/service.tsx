import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import * as XLSX from 'xlsx';

import { getListBidding } from 'store/slices/biddingSlice';

const useService = () => {
  const dispatch = useDispatch();
  const { listBidding, loading } = useSelector((state: RootState) => state.bidding);

  const handleExcelDownload = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
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
    link.setAttribute('download', 'data.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    dispatch(getListBidding() as any);
  }, []);
  return {
    listBidding,
    loading,
    handleExcelDownload,
  };
};
export default useService;
