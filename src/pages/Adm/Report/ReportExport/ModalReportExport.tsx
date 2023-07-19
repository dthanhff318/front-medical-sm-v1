import React from 'react';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import styles from './ReportExport.module.scss';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';
import { TSupplyResponse } from 'types/supply';
type Props = {
  open: boolean;
  onCancel: () => void;
  listSupplyExport: Array<TSupplyResponse>;
  handleExportExcel: (data: Array<TSupplyResponse>) => void;
};
const ModalReportExport = ({ handleExportExcel, listSupplyExport, open, onCancel }: Props) => {
  const columns: any = [
    {
      title: 'Tên vật tư',
      width: 250,
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Mã',
      width: 100,
      dataIndex: 'code',
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
      title: 'Nhóm',
      dataIndex: 'group',
      width: 250,
    },
    {
      title: 'Hao phí',
      dataIndex: 'isLoss',
      width: 100,
    },
    {
      title: 'Model',
      dataIndex: 'brand',
      width: 200,
    },
    {
      title: 'Tên công ty',
      dataIndex: 'company',
      width: 200,
    },
    {
      title: 'Tên nước',
      dataIndex: 'country',
      width: 150,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'dateExpired',
      width: 150,
    },
    {
      title: 'Lô SX',
      dataIndex: 'productCode',
      width: 150,
    },
    {
      title: 'Số lượng xuất',
      dataIndex: 'quantityExpect',
      width: 150,
    },
    {
      title: 'Số lượng kho',
      dataIndex: 'quantity',
      width: 100,
    },
  ];
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <Row justify="center" className={styles.tittle}>
          <Col span={6}>
            <span className={styles.name}>Thông tin xuất kho</span>
          </Col>
        </Row>
        <Table
          columns={columns}
          //loading={loading}
          dataSource={listSupplyExport.map((e) => ({
            ...e,
            group: e?.group?.name,
            unit: e?.unit?.name,
            company: e.company ? e.company.name : '',
            isLoss: e.isLoss ? 'Có' : 'Không',
          }))}
          size="middle"
          scroll={{ x: 'max-content', y: '50vh' }}
          rowKey="id"
          pagination={false}
        />
        <Row justify="center" className={styles.export}>
          <Col span={4}>
            <CommonButton onClick={() => handleExportExcel(listSupplyExport)}>
              Xuất Excel
            </CommonButton>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ModalReportExport;
