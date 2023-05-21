import React, { useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import ModalDelete from 'components/CommonModal/ModalDelete';
import styles from './style.module.scss';
import ModalPlanDetail from './ModalPlanDetail';
import MPath from 'routes/routes';
import { Link } from 'react-router-dom';
import useService from './service';
import { replacePathParams } from 'helpers/functions';
import { listTypes } from 'const';

type TModal = '' | 'delete' | 'detail';
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
      dataIndex: 'createdTime',
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
          <CommonButton
            onClick={() => {
              setOpenModal('detail');
            }}
          >
            Chi tiết
          </CommonButton>
          <CommonButton
            danger
            onClick={() => {
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
  const [department, setDepartment] = useState<number>(0);
  const [typePlan, setTypePlan] = useState<number>(0);
  const { departmentList, plans } = useService({ department, typePlan });

  const onChangeDepartment = (e) => {
    setDepartment(e.value);
  };

  const onChangeTypePlan = (e) => {
    setTypePlan(e);
  };
  return (
    <>
      <ModalDelete
        open={openModal === 'delete'}
        title="Ban co chac chan xoa khong ?"
        subTitle="Xoa"
        onCancel={() => setOpenModal('')}
        onOk={() => {
          setOpenModal('');
        }}
      />
      <ModalPlanDetail
        open={openModal === 'detail'}
        // onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Danh sách phiếu duyệt</h2>
        <Row gutter={[20, 20]} className={styles.groupBtn}>
          <Col span={10}>
            <p>Khoa phòng</p>
            <Select
              labelInValue={true}
              placeholder="Chọn khoa phòng"
              style={{ width: '100%' }}
              onChange={onChangeDepartment}
              options={departmentList.map((d) => ({ label: d.name, value: d.id }))}
            />
          </Col>
          <Col span={12}>
            <p>Loại phiếu</p>
            <Select
              placeholder="Chọn loại phiếu"
              style={{ width: '100%' }}
              onChange={onChangeTypePlan}
              options={listTypes}
            />
          </Col>
        </Row>
        <Table dataSource={plans} columns={columns} />
      </div>
    </>
  );
};
export default ExportSupply;
