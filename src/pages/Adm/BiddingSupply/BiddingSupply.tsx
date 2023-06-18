import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Accept, useDropzone } from 'react-dropzone';
import s from './BiddingSupply.module.scss';
import Table from 'antd/es/table';
import { useSelector } from 'react-redux';
import biddingApi from 'axiosConfig/api/bidding';
import useService from './service';
import CommonButton from 'components/CommonButton/CommonButton';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { createQueryUrl } from 'helpers/functions';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { getListBidding } from 'store/slices/biddingSlice';
import ModalDelete from 'components/CommonModal/ModalDelete';
import { RootState } from 'store';
import { IndexedObject } from 'types/common';
type TModal = '' | 'delete' | 'create';
const { Option } = Select;
const BiddingSupply = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { listBidding, urlQueryParams, loading, pagination, handleExcelDownload } = useService();
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [openModal, setOpenModal] = useState<TModal>('');

  const [filter, setFilter] = useState({
    page: 1,
    q: '',
    company: undefined,
    group: undefined,
  });
  const infoSelect = useSelector((state: RootState) => state.common);

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
      const mappingData = rows.map((r: any) => ({
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
        const chunk = dataSlice.slice(i, i + chunkSize);
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
  const onSearch = (value: IndexedObject) => {
    setFilter((prev) => ({ ...prev, ...value }));
    dispatch(getListBidding({ ...filter, ...value }) as any);
  };

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
          <CommonButton
            onClick={() => {
              setOpenModal('delete');
            }}
            danger
          >
            Xóa
          </CommonButton>
        </div>
      ),
    },
  ];

  const onChangePage = (page: number, limit: number) => {
    setFilter((prev) => ({ ...prev, page }));
    dispatch(getListBidding({ ...filter, page }) as any);
  };

  return (
    <div className={s.wrapper}>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc muốn xóa vật tư ?"
        subTitle="Xóa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          //onDeleteSupplyStore(selectSupply)
          setOpenModal('');
        }}
      />
      <h2 className={s.title}>Danh sách vật tư đầu thầu</h2>
      <Form form={form} name="control-hooks" onFinish={(value) => onSearch(value)}>
        <Row gutter={[8, 0]} style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Form.Item name="q" rules={[{ required: false }]}>
              <Input placeholder="Nhập tên vật tư" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="company" rules={[{ required: false }]}>
              <Select placeholder="Chọn nhà cung cấp" style={{ width: '100%' }} listHeight={250}>
                {infoSelect.suppliers?.map((e) => (
                  <Option value={e.id}>{e.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item name="group" rules={[{ required: false }]}>
              <Select placeholder="Phân loại" style={{ width: '100%' }} listHeight={250}>
                {infoSelect.groups?.map((e) => (
                  <Option value={e.id}>{e.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={listBidding.map((e) => ({
          ...e,
          company: e.company?.name,
          unit: e.unit?.name,
          group: e.group?.name,

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
          current={filter.page}
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
