import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Accept, useDropzone } from 'react-dropzone';
import s from './BiddingSupply.module.scss';
import Table, { ColumnsType } from 'antd/es/table';

const BiddingSupply = () => {
  const [rows, setRows] = useState<any>([]);

  // Hàm để đọc dữ liệu từ file Excel
  const handleExcelUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBufferLike);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setRows(rows);
    };
    reader.readAsArrayBuffer(file);
  };

  // Hàm để xuất file Excel
  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
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

  // Sử dụng useDropzone để tạo phần tử Dropzone để kéo thả file Excel
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx, .xls' as unknown as Accept,
    multiple: false,
    onDrop: (acceptedFiles) => {
      handleExcelUpload(acceptedFiles[0]);
    },
  });

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID ',
      dataIndex: 'id',
      width: 50,
      fixed: 'left',
    },
    {
      title: 'Mã TT',
      dataIndex: 'code-tt',
      width: 100,
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
      dataIndex: 'age',
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
      title: 'Đơn giá',
      dataIndex: 'unitPrice',
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
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Danh sách vật tư đầu thầu</h2>
      {/* <Table bordered scroll={{ y: '50vh' }} columns={columns} dataSource={data} size="middle" /> */}
      <Table
        bordered
        columns={columns}
        dataSource={data}
        scroll={{ x: 'max-content', y: '50vh' }}
      />
      <div className={s.handleZone}>
        <div className={s.dropzone} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Kéo thả hoặc nhấn vào đây để tải lên file Excel</p>
        </div>
        <button onClick={handleExcelDownload}>Xuất file Excel</button>
      </div>
    </div>
  );
};

export default BiddingSupply;
