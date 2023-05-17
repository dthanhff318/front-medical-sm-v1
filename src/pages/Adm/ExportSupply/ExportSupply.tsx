import React, { useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import ModalTicket from './ModalTicket';
import MPath from 'routes/routes';
import { Link } from 'react-router-dom';
import useService from './service';
import { replacePathParams } from 'helpers/functions';

type TModal = '' | 'delete' | 'create';
const ExportSupply = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: '40%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '30%',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, d) => (
        <div className={styles.actionBtn}>
          <Link to={replacePathParams(MPath.ADM_DEPARTMENT_DETAIL, { id: d.id })}>
            <CommonButton>Chi tiết</CommonButton>
          </Link>
          <CommonButton
            danger
            onClick={() => {
              setSelectDepartment(d.id);
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
  const [selectDepartment, setSelectDepartment] = useState<number>(-1);
  const { departmentListMapping, onCreateDepartment, handleDeleteDepartment } = useService();

  const onChangeDepartment = () => {};
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          handleDeleteDepartment(selectDepartment);
          setOpenModal('');
        }}
      />
      <ModalTicket
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Danh sách phiếu duyệt</h2>
        <Row gutter={[20, 20]} className={styles.groupBtn}>
          <Col span={6}>
            <p>Khoa phòng</p>
            <Select
              labelInValue={true}
              placeholder="Chọn khoa phòng"
              style={{ width: '100%' }}
              onChange={onChangeDepartment}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </Col>
          <Col span={8}>
            <p>Loại phiếu</p>
            <Select
              placeholder="Chọn loại phiếu"
              style={{ width: '100%' }}
              onChange={onChangeDepartment}
              options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
              ]}
            />
          </Col>
        </Row>
        <Table dataSource={departmentListMapping} columns={columns} />
      </div>
    </>
  );
};
export default ExportSupply;
