import { Form, Input, Modal, Table } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import { TCreateDepartments } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
type Props = {
  open: boolean;
  onCreateDepartment?: (data: TCreateDepartments) => void;
  onCancel: () => void;
};

const ModalPlanDetail = ({ open, onCreateDepartment, onCancel }: Props) => {
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
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={'70vw'}>
      <div className={styles.wrapperModal}>
        <p className={styles.modalTitle}>Thông tin chi tiết phiếu</p>
        <Table
          style={{ margin: '20px 0' }}
          columns={columns}
          size="middle"
          bordered
          scroll={{ x: 'max-content', y: '500px' }}
        />
      </div>
    </Modal>
  );
};

export default ModalPlanDetail;
