import React, { useState } from 'react';
import { Table, Select, Row, Col } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import styles from './style.module.scss';
import MPath from 'routes/routes';
import { useNavigate } from 'react-router-dom';
import useService from './service';
import { listTypePlanImport, listTypes } from 'const';
import { replacePathParams } from 'helpers/functions';

const ListTicket = () => {
  const navigate = useNavigate();
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
      width: '30%',
    },
    {
      title: 'Loại phiếu',
      dataIndex: 'typePlan',
      key: 'type',
      width: '30%',
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
              navigate(replacePathParams(MPath.ADM_DETAIL_TICKET, { id: d.id }));
            }}
          >
            Chi tiết
          </CommonButton>
        </div>
      ),
    },
  ];
  const [department, setDepartment] = useState<number | undefined>(undefined);
  const [typePlan, setTypePlan] = useState<number | undefined>(undefined);
  const { departmentList, plans, loading } = useService({ department, typePlan });
  console.log(plans);
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
            dataSource={plans.map((e) => {
              const type = e.typePlan;
              let namePlan;
              if (type === 1) {
                namePlan = 'Yêu cầu hao phí';
              } else if (type === 2) {
                namePlan = 'Yêu cầu Cơ số tủ trực';
              } else if (type === 3) {
                namePlan = 'Hoàn trả Hao phí';
              } else if (type === 4) {
                namePlan = 'Hoàn trả Cơ số tủ trực';
              }
              return {
                ...e,
                status: e.isAccepted ? 'Đã duyệt' : 'Chờ duyệt',
                typePlan: namePlan,
              };
            })}
            columns={columns}
            rowKey="id"
            rowClassName={getClassRow}
            loading={loading}
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
export default ListTicket;
