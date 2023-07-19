import { Form, Input, Modal, Table } from 'antd';
import React from 'react';
import styles from './Debt.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { getNameById } from 'helpers/functions';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
type Props = {
  open: boolean;
  onCancel: () => void;
  data: any;
};

const ModalDetail = ({ open, onCancel, data }: Props) => {
  const { groups, units, suppliers } = useSelector((state: RootState) => state.common);

  const columns: any = [
    {
      title: 'Mã',
      width: 100,
      dataIndex: 'code',
      fixed: 'left',
    },
    {
      title: 'Tên vật tư',
      width: 250,
      dataIndex: 'name',
    },
    {
      title: 'Hoạt chất',
      width: 200,
      dataIndex: 'ingredient',
    },
    {
      title: 'Đơn vị tính',
      width: 100,
      dataIndex: 'unit',
    },
    {
      title: 'Nhóm',
      width: 150,
      dataIndex: 'group',
    },
    {
      title: 'Hao phí',
      width: 100,
      dataIndex: 'isLoss',
    },
    {
      title: 'HSD',
      width: 150,
      dataIndex: 'dateExpired',
    },
    {
      title: 'Model',
      width: 200,
      dataIndex: 'brand',
    },
    {
      title: 'Tên nước',
      width: 200,
      dataIndex: 'country',
    },
    {
      title: 'Nhà cung cấp',
      width: 200,
      dataIndex: 'company',
    },
    {
      title: 'Năm thầu',
      width: 200,
      dataIndex: 'yearBidding',
    },
    {
      title: 'Mã thầu',
      width: 200,
      dataIndex: 'codeBidding',
    },
    {
      title: 'SL thầu',
      width: 200,
      dataIndex: 'biddingCount',
    },
    {
      title: 'SL nhập',
      width: 200,
      dataIndex: 'quantity',
    },
    {
      title: 'Lô SX',
      width: 200,
      dataIndex: 'productCode',
    },
    {
      title: 'Đơn giá',
      width: 200,
      dataIndex: 'price',
    },
    {
      title: 'Tổng tiền',
      width: 200,
      dataIndex: 'totalPrice',
    },
  ];
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <p className={styles.modalTitle}>Thông tin chi tiết</p>
        <Table
          columns={columns}
          dataSource={data.map((e) => ({
            ...e,
            isLoss: e.isLoss ? 'Có' : 'Không',
            group: getNameById(e.group, groups),
            unit: getNameById(e.unit, units),
            company: getNameById(e.company, suppliers),
          }))}
          size="middle"
          scroll={{ x: 'max-content', y: '50vh' }}
          rowKey="code"
          // pagination={false}
        />
      </div>
    </Modal>
  );
};

export default ModalDetail;
