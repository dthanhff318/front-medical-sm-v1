import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import * as XLSX from 'xlsx';

import { deleteSupplyBidding, getListBidding } from 'store/slices/biddingSlice';
import biddingApi from 'axiosConfig/api/bidding';

const useService = () => {
  const dispatch = useDispatch();

  const { listBidding, loading, pagination } = useSelector((state: RootState) => state.bidding);

  const handleExcelDownload = async () => {
    try {
      const res = await biddingApi.getListBidding({ limit: 1000000 });
      const convertData = res.data.results.map((e) => ({
        ['Mã']: e.code,
        ['Tên vật tư']: e.name,
        ['Hoạt chất']: e.ingredient,
        ['Đơn vị']: e.unit.name,
        ['Nhóm']: e.group.name,
        ['Hao phí']: e.isLoss ? 'Có' : 'Không',
        ['Model']: e.brand,
        ['Quốc gia']: e.country,
        ['Công ty']: e.company.name,
        ['Năm thầu']: e.yearBidding,
        ['Mã thầu']: e.codeBidding,
        ['Số lượng thầu']: e.biddingCount,
        ['Số lượng mua']: e.buyCount,
        ['Số lượng còn lại']: e.remainCount,
        ['Giá thầu']: e.biddingPrice,
        ['Mã hợp đồng']: e.contract,
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
      link.setAttribute('download', 'data-bidding.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteDepartment = (id: number) => {
    dispatch(deleteSupplyBidding(id) as any);
  };
  useEffect(() => {
    dispatch(getListBidding({}) as any);
  }, []);
  return {
    listBidding,
    loading,
    pagination,
    handleExcelDownload,
    handleDeleteDepartment,
  };
};
export default useService;
