import React, { useState } from 'react';
import { Col, Row, Select, Table } from 'antd';
import styles from './style.module.scss';
import Search from 'antd/es/input/Search';
import useService from './service';
import CommonButton from 'components/CommonButton/CommonButton';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { useLocation, useNavigate } from 'react-router-dom';
import { createQueryUrl } from 'helpers/functions';
import ModalDetailStore from './ModalDetailStore';
import ModalDelete from 'components/CommonModal/ModalDelete';
type TModal = '' | 'delete' | 'create';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openModal, setOpenModal] = useState<TModal>('');
  const [itemSupply, setItemSupply] = useState<any>({});
  const [selectSupply, setSelectSupply] = useState<any>();
  const [value, setValue] = useState<string>('');
  const {
    stores,
    loading,
    urlQueryParams,
    pagination,
    getStore,
    handleUpdateSupplyStore,
    onDeleteSupplyStore,
  } = useService({ value });

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
        <div className={styles.actionBtn}>
          <CommonButton
            onClick={() => {
              const dataRaw = stores.find((e) => e.id === record.id);
              setItemSupply(dataRaw);
              setOpenModal('create');
              setValueSearch('');
            }}
          >
            Chi tiết
          </CommonButton>
          <CommonButton
            danger
            onClick={() => {
              setSelectSupply(record.id);
              setOpenModal('delete');
            }}
          >
            Xóa
          </CommonButton>
          {/* onDeleteSupplyStore(record.id) */}
        </div>
      ),
    },
  ];

  const onChangePage = (page: number, limit: number) => {
    navigate(createQueryUrl(location, { ...urlQueryParams, page, limit }));
  };
  const setValueSearch = (e: string) => {
    setValue(e);
  };
  return (
    <div className={styles.wapper}>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc muốn xóa vật tư ?"
        subTitle="Xóa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          onDeleteSupplyStore(selectSupply);
          setOpenModal('');
        }}
      />
      <h2 className={styles.title}>Tổng kho</h2>
      <Row gutter={[8, 0]} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Search placeholder="Nhập tên vật tư" onSearch={onSearch} style={{ width: '100%' }} />
        </Col>
        <Col span={5}>
          <Select
            placeholder="Chọn nhà cung cấp"
            style={{ width: '100%' }}
            onChange={() => {}}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
            ]}
          />
        </Col>
        <Col span={5}>
          <Select
            placeholder="Chọn Nhóm vật tư"
            style={{ width: '100%' }}
            onChange={() => {}}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
            ]}
          />
        </Col>
        <Col span={5}>
          <CommonButton onClick={() => setOpenModal('create')}>Tìm kiếm</CommonButton>
        </Col>
      </Row>
      <ModalDetailStore
        itemSupply={itemSupply}
        open={openModal === 'create'}
        onCancel={() => setOpenModal('')}
        value={value}
        setValueSearch={setValueSearch}
        handleUpdateSupplyStore={handleUpdateSupplyStore}
      />
      <Table
        columns={columns}
        loading={loading}
        dataSource={stores.map((e) => ({
          ...e,
          company: e.company.name,
          isLoss: e.isLoss ? 'Có' : 'Không',
        }))}
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
