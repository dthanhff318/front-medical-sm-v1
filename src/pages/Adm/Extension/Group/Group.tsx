import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './Group.module.scss';
import Search from 'antd/es/input/Search';
type TModal = '' | 'delete' | 'create';
const Group = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên nhóm vật tư',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
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
              console.log(d);
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
  const onSearch = (value: string) => {
  };
  
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Bạn có chắc chắn xóa không ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          //handleDeleteSupplier(selectSupplier);
          setOpenModal('');
        }}
      />
      {/* <ModalCreateDepartment
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      /> */}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản lý nhóm vật tư</h2>
        <Row gutter={[8, 0]} justify = 'space-between'style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search placeholder="Nhập nhóm vật tư" onSearch={onSearch} style={{ width: '100%' }} />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới nhóm</CommonButton>
          </Col>
        </Row>
        <Table dataSource={[]} columns={columns} />
      </div>
    </>
  );
};
export default Group;
