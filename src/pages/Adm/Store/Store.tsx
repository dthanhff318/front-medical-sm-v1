import React from 'react';
import { Col, Input, Space, Row, Table, Select, Divider } from 'antd';
import styles from './style.module.scss';
import Search from 'antd/es/input/Search';
import useService from './service';
import CommonButton from 'components/CommonButton/CommonButton';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { useLocation, useNavigate } from 'react-router-dom';
import { createQueryUrl } from 'helpers/functions';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { stores, loading, urlQueryParams, pagination, getStore, onDeleteSupplyStore } =
    useService();

  const onSearch = (value: string) => {
    getStore({ q: value });
  };

  const columns: any = [
    {
      title: 'Tên vật tư',
      width: 250,
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Hoạt chất',
      width: 150,
      dataIndex: 'ingredient',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      width: 100,
    },
    {
      title: 'Nhóm',
      dataIndex: 'group',
      width: 250,
    },
    {
      title: 'Tên hãng',
      dataIndex: 'brand',
      width: 200,
    },
    {
      title: 'Tên công ty',
      dataIndex: 'company',
      width: 200,
    },
    {
      title: 'Tên nước',
      dataIndex: 'country',
      width: 150,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'dateExpired',
      width: 150,
    },
    {
      title: 'Lô SX',
      dataIndex: 'productCode',
      width: 150,
    },
    {
      title: 'Mã thầu',
      dataIndex: 'codeBidding',
      width: 150,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: '',
      fixed: 'right',
      width: 100,
      render: (_, record: any) => (
        <CommonButton danger onClick={() => onDeleteSupplyStore(record.id)}>
          Xóa
        </CommonButton>
      ),
    },
  ];

  const onChangePage = (page: number, limit: number) => {
    navigate(createQueryUrl(location, { ...urlQueryParams, page, limit }));
  };

  return (
    <div className={styles.wapper}>
      <h2 className={styles.title}>Tổng kho</h2>
      <Row gutter={[8, 0]} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Search placeholder="Nhập tên vật tư" onSearch={onSearch} style={{ width: '100%' }} />
        </Col>
      </Row>
      <Table
        columns={columns}
        loading={loading}
        dataSource={stores.map((e) => ({ ...e, company: e.company.name }))}
        size="middle"
        scroll={{ x: 'max-content', y: '60vh' }}
        rowKey="id"
        pagination={false}
      />
      <Row justify={'center'} style={{ marginTop: '20px' }}>
        <PaginationCustom
          total={pagination.totalResults}
          current={pagination.page}
          pageSize={pagination.limit}
          onChange={onChangePage}
        />
      </Row>
    </div>
  );
};

export default Store;
