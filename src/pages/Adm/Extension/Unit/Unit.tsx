import React, { useState } from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './Unit.module.scss';
import Search from 'antd/es/input/Search';
import useService from './service';
type TModal = '' | 'delete' | 'create';
const Unit = () => {
  const { unitState, handleDeleteUnit } = useService();
  const [selectUnit, setSelectUnit] = useState<number>(-1);

  const { units, pagination } = unitState;
  const unitListMapping =
    units.map((d) => ({
      ...d,
      key: d?.id,
    })) ?? [];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Tên đơn vị',
      dataIndex: 'name',
      key: 'name',
      width: '80%',
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
              setSelectUnit(d.id);
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
          handleDeleteUnit(selectUnit);
          setOpenModal('');
        }}
      />
      {/* <ModalCreateDepartment
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      /> */}
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Quản lý đơn vị</h2>
        <Row gutter={[8, 0]} justify = 'space-between'style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Search placeholder="Nhập đơn vị" onSearch={onSearch} style={{ width: '100%' }} />
          </Col>
          <Col span={4}>
            <CommonButton onClick={() => setOpenModal('create')}>Thêm mới đơn vị</CommonButton>
          </Col>
        </Row>
        <Table dataSource={unitListMapping} columns={columns} />
      </div>
    </>
  );
};
export default Unit;
