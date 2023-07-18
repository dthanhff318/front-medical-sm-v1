import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import Search from 'antd/es/input/Search';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import ModalCreateStaff from './ModalCreateStaff';
import useService from './service';
import { ERole } from 'enums';

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
      title: 'Tên nhân viên',
      dataIndex: 'displayName',
      key: 'displayName',
      width: '40%',
    },
    {
      title: 'Chức vụ',
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
            Xóa
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
        title="Bạn có chắc muốn xóa nhân viên ?"
        subTitle="Xóa"
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
        <h2 className={styles.title}>Quản lý nhân viên</h2>
        <Row gutter={[8, 0]} justify="space-between" style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search
              placeholder="Nhập tên nhân viên"
              onSearch={onSearch}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới nhân viên</CommonButton>
          </Col>
        </Row>

        <Table
          dataSource={listStaff.map((e) => ({
            ...e,
            role:
              e.role === ERole.Staff_Accept
                ? 'Nhân viên quản lý vật tư'
                : 'Nhân viên quản lý báo cáo',
          }))}
          columns={columns}
          loading={loading}
        />
      </div>
    </>
  );
};
export default StaffManage;
