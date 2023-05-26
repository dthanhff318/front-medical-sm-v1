import React, { useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import styles from './style.module.scss';
import ModalPlanDetail from './ModalPlanDetail';
import MPath from 'routes/routes';
import { Link } from 'react-router-dom';
import useService from './service';
import { listTypes } from 'const';

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
              setOpenModal(d.id);
            }}
          >
            Chi tiết
          </CommonButton>
        </div>
      ),
    },
  ];
  const [openModal, setOpenModal] = useState<number>(0);
  const [department, setDepartment] = useState<number | undefined>(undefined);
  const [typePlan, setTypePlan] = useState<number | undefined>(undefined);
  const { departmentList, plans } = useService({ department, typePlan });

  const onChangeDepartment = (e) => {
    setDepartment(e.value);
  };

  const onChangeTypePlan = (e) => {
    setTypePlan(e);
  };
  const getClassRow = (record) => {
    return record.isAccepted ? styles.acceptPlan : styles.pendingPlan;
  };
  return (
    <>
      <ModalPlanDetail open={openModal} onCancel={() => setOpenModal(0)} />
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
        {department ? (
          <Table
            dataSource={plans.map((e) => ({
              ...e,
              status: e.isAccepted ? 'Đã duyệt' : 'Chờ duyệt',
            }))}
            columns={columns}
            rowKey="id"
            rowClassName={getClassRow}
          />
        ) : (
          <div className={styles.wrapNoTable}>
            <h2 className={styles.titleNoTable}>Vui lòng chọn một khoa phòng để xem.</h2>
          </div>
        )}
      </div>
    </>
  );
};
export default ExportSupply;
