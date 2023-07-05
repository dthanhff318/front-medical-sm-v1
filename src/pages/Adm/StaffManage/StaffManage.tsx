import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import Search from 'antd/es/input/Search';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import ModalCreateStaff from './ModalCreateStaff';
import useService from './service';

type TModal = '' | 'delete' | 'create';
const StaffManage = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên nhan vien',
      dataIndex: 'displayName',
      key: 'displayName',
      width: '40%',
    },
    {
      title: 'Chuc vu',
      dataIndex: 'role',
      width: '30%',
      key: 'role',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, d) => (
        <div className={styles.actionBtn}>
          <CommonButton
            danger
            onClick={() => {
              setSelectStaff(d.id);
              setOpenModal('delete');
            }}
          >
            Xoa
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<TModal>('');
  const [selectStaff, setSelectStaff] = useState<number>(-1);
  const { onCreateStaff, onSearch, listStaff, handleDeleteStaff, loading } = useService();

  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteStaff(selectStaff);
          setOpenModal('');
        }}
      />
      <ModalCreateStaff
        open={openModal === 'create'}
        onCreateStaff={onCreateStaff}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản lý nhan vien</h2>
        <Row gutter={[8, 0]} justify="space-between" style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search
              placeholder="Nhập tên nhan vien"
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới nhan vien</CommonButton>
          </Col>
        </Row>

        <Table dataSource={listStaff} columns={columns} loading={loading} />
      </div>
    </>
  );
};
export default StaffManage;
