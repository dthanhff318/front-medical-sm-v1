import React, { useState } from 'react';
import CommonButton from 'components/CommonButton/CommonButton';
import MPath from 'routes/routes';
import { useNavigate } from 'react-router-dom';
import useService, { EditableCellProps } from './service';
import styles from './style.module.scss';
import { Col, Form, InputNumber, Row, Table } from 'antd';
import { savePlanDetail } from 'store/slices/planSlice';
import { useDispatch } from 'react-redux';
import { RollbackOutlined } from '@ant-design/icons';
import { getNameByTicketType } from 'helpers/functions';

const TicketHistoryDetail = () => {
  const navigate = useNavigate();
  const { planDetail, loading: loadingTable, deleteTicket, id: idTicket } = useService();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);
  const columns: any = [
    {
      title: 'Mã',
      dataIndex: 'code',
      width: 80,
    },
    {
      title: 'Tên vật tư',
      width: 250,
      dataIndex: 'name',
    },
    {
      title: 'Hoạt chất',
      width: 150,
      dataIndex: 'ingredient',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      width: 80,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantityExpect',
      editable: true,
      width: 100,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'dateExpired',
      width: 160,
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      width: 250,
    },
    {
      title: 'Tên hãng',
      dataIndex: 'brand',
      width: 250,
    },
    {
      title: 'Tên nước',
      dataIndex: 'country',
      width: 150,
    },
    {
      title: 'Lô SX',
      dataIndex: 'productCode',
      width: 100,
    },
  ];

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Chi tiết phiếu gửi</h2>
        <CommonButton onClick={() => navigate(MPath.USER_TICKET_HISTORY)}>
          <RollbackOutlined />
        </CommonButton>
        <div className={styles.content}>
          <p className={styles.info}>
            Người gửi: <i>{planDetail.name}</i>
          </p>
          <p className={styles.info}>
            Loại phiếu: <i>{getNameByTicketType(planDetail.typePlan)}</i>
          </p>
          <p className={styles.info}>
            Ghi chú: <i>{planDetail.note}</i>
          </p>
          <Form form={form} component={false}>
            <Table
              style={{ margin: '20px 0' }}
              columns={columns}
              dataSource={planDetail.planList?.map((c) => ({ ...c, supplier: c.company?.name }))}
              size="middle"
              bordered
              scroll={{ x: 'max-content', y: '500px' }}
              rowKey="id"
              loading={loadingTable}
            />
          </Form>
          <Row justify="center" gutter={[40, 40]}>
            {!planDetail.isAccepted && (
              <>
                <Col>
                  <CommonButton danger onClick={() => deleteTicket(Number(idTicket))}>
                    Xóa phiếu
                  </CommonButton>
                </Col>
              </>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default TicketHistoryDetail;
