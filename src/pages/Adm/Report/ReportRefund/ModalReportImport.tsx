import React from 'react';
import { Col, Modal, Row, Table } from 'antd';
import styles from './ReportRefund.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import useService from './service';
import { getNameById } from 'helpers/functions';

type Props = {
  open: boolean;
  onCancel: () => void;
  listSupplyImport: Array<any>;
  handleExportExcel: (data: Array<any>) => void;
};
const ModalReportImport = ({ handleExportExcel, listSupplyImport, open, onCancel }: Props) => {
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
      title: 'Tên hãng',
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
      title: 'Số lượng nhap',
      dataIndex: 'quantityImport',
      width: 150,
    },
    {
      title: 'Số lượng kho',
      dataIndex: 'quantity',
      width: 100,
    },
  ];
  const { groups, suppliers, units } = useService();

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <Row justify="center" className={styles.tittle}>
          <Col span={6}>
            <span className={styles.name}>Thông tin nhap kho</span>
          </Col>
        </Row>
        <Table
          columns={columns}
          //loading={loading}
          dataSource={listSupplyImport.map((e) => ({
            ...e,
            group: getNameById(e.group, groups),
            unit: getNameById(e.unit, units),
            company: getNameById(e.company, suppliers),
            isLoss: e.isLoss ? 'Có' : 'Không',
          }))}
          size="middle"
          scroll={{ x: 'max-content', y: '50vh' }}
          rowKey="id"
          pagination={false}
        />
        <Row justify="center" className={styles.export}>
          <Col span={4}>
            <CommonButton onClick={() => handleExportExcel(listSupplyImport)}>
              Xuất Excel
            </CommonButton>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ModalReportImport;
