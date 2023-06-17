import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Accept, useDropzone } from 'react-dropzone';
import s from './BiddingSupply.module.scss';
import Table, { ColumnsType } from 'antd/es/table';
import biddingApi from 'axiosConfig/api/bidding';
import useService from './service';
import CommonButton from 'components/CommonButton/CommonButton';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { createQueryUrl } from 'helpers/functions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row } from 'antd';
import { useDispatch } from 'react-redux';
import { getListBidding } from 'store/slices/biddingSlice';

const BiddingSupply = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { listBidding, urlQueryParams, loading, pagination, handleExcelDownload } = useService();
  const [loadingUpload, setLoadingUpload] = useState(false);
  // Hàm để đọc dữ liệu từ file Excel
  const handleExcelUpload = (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setLoadingUpload(true);
      const data = new Uint8Array(e.target?.result as ArrayBufferLike);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const mappingData = rows.map((r: any, i: number) => ({
        code: r[0],
        name: r[1],
        ingredient: r[2],
        unit: r[3],
        group: r[4],
        isLoss: r[5] === 'Có' ? true : false,
        brand: r[6],
        country: r[7],
        company: r[8],
        yearBidding: r[9],
        codeBidding: r[10],
        biddingCount: r[11],
        buyCount: r[12],
        remainCount: r[13],
        biddingPrice: r[14],
        contract: r[15],
      }));

      const dataSlice = mappingData.slice(1);

      const chunkSize = 50;
      for (let i = 0; i < dataSlice.length; i += chunkSize) {
        const chunk = dataSlice.slice(i, i + chunkSize); // lấy ra phần từ vị trí i đến i + chunkSize
        // gửi chunk lên server
        await biddingApi.updateBidding({
          bidding: chunk,
        });
      }
      setLoadingUpload(false);
      dispatch(getListBidding(urlQueryParams) as any);
    };
    reader.readAsArrayBuffer(file);
  };

  // Sử dụng useDropzone để tạo phần tử Dropzone để kéo thả file Excel
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx, .xls' as unknown as Accept,
    multiple: false,
    onDrop: (acceptedFiles) => {
      handleExcelUpload(acceptedFiles[0]);
    },
  });

  const columns: any = [
    {
      title: 'ID ',
      dataIndex: 'id',
      width: 50,
      fixed: 'left',
    },
    {
      title: 'Mã',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'Hoạt chất',
      dataIndex: 'ingredient',
      width: 300,
    },
    {
      title: 'ĐVT',
      dataIndex: 'unit',
      width: 100,
    },
    {
      title: 'Nhóm',
      dataIndex: 'group',
      width: 200,
    },
    {
      title: 'Hao phí',
      dataIndex: 'isLoss',
      width: 100,
    },
    {
      title: 'Tên hãng',
      dataIndex: 'brand',
      width: 200,
    },
    {
      title: 'Tên nước',
      dataIndex: 'country',
      width: 200,
    },
    {
      title: 'NSX',
      dataIndex: 'company',
      width: 200,
    },
    {
      title: 'Năm thầu',
      dataIndex: 'yearBidding',
      width: 200,
    },
    {
      title: 'Mã thầu',
      dataIndex: 'codeBidding',
      width: 200,
    },
    {
      title: 'SL thầu',
      dataIndex: 'biddingCount',
      width: 200,
    },
    {
      title: 'SL nhập',
      dataIndex: 'buyCount',
      width: 200,
    },
    {
      title: 'SL còn lại',
      dataIndex: 'remainCount',
      width: 200,
    },
    {
      title: 'Giá thầu',
      dataIndex: 'biddingPrice',
      width: 200,
    },
    {
      title: 'Số HĐ',
      dataIndex: 'contract',
      width: 200,
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, data) => (
        <div className={s.actionBtn}>
          <CommonButton danger>Xóa</CommonButton>
        </div>
      ),
    },
  ];

  const onChangePage = (page: number, limit: number) => {
    navigate(createQueryUrl(location, { ...urlQueryParams, page, limit }));
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Danh sách vật tư đầu thầu</h2>
      <Table
        bordered
        columns={columns}
        dataSource={listBidding.map((e) => ({
          ...e,
          company: e.company?.name,
          isLoss: e.isLoss ? 'Có' : 'Không',
        }))}
        size="middle"
        scroll={{ x: 'max-content', y: '50vh' }}
        loading={loading || loadingUpload}
        pagination={false}
        rowKey="id"
      />
      <Row justify={'center'} style={{ marginTop: '20px' }}>
        <PaginationCustom
          total={pagination.totalResults}
          current={pagination.page}
          pageSize={pagination.limit}
          onChange={onChangePage}
        />
      </Row>

      <div className={s.handleZone}>
        <div className={s.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Kéo thả hoặc nhấn vào đây để tải lên file Excel</p>
        </div>
        <button onClick={() => handleExcelDownload(listBidding)}>Xuất file Excel</button>
      </div>
    </div>
  );
};

export default BiddingSupply;
