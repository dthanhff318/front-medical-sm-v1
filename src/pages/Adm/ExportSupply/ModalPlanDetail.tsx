import { Form, Input, Modal, Row, Table, Col } from 'antd';
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanDetail } from 'store/slices/planSlice';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';
type Props = {
  open: number;
  onCancel: () => void;
};

const ModalPlanDetail = ({ open, onCancel }: Props) => {
  const dispatch = useDispatch();
  const { planDetail } = useSelector((state: RootState) => state.plan);
  const columns: any = [
    {
      title: 'Mã',
      dataIndex: 'id',
      width: 100,
    },
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
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: 100,
    },
  ];
  useEffect(() => {
    if (open) dispatch(getPlanDetail(open) as any);
  }, [open]);
  return (
    <Modal open={!!open} footer={null} onCancel={onCancel} width={'70vw'}>
      <div className={styles.wrapperModal}>
        <p className={styles.modalTitle}>Thông tin chi tiết phiếu</p>
        <p>Người gửi: {planDetail.name}</p>
        <p>Khoa phòng: {planDetail.department?.name}</p>
        <p>Ghi chú: {planDetail.note}</p>
        <Table
          style={{ margin: '20px 0' }}
          columns={columns}
          size="middle"
          bordered
          scroll={{ x: 'max-content', y: '500px' }}
        />
      </div>
      <Row justify="center" gutter={[40, 40]}>
        <Col>
          <CommonButton>Phê duyệt</CommonButton>
        </Col>
        <Col>
          <CommonButton danger>Hủy bỏ</CommonButton>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPlanDetail;
