import React from 'react';
import { Col, Modal, Row, Table } from 'antd';
import styles from './ReportInventory.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { getNameById } from 'helpers/functions';
import useService from './service';

type Props = {
  open: boolean;
  onCancel: () => void;
  listSupplyExport: Array<any>;
  handleExportExcel: (data: any) => void;
};
const ModalReportInventory = ({ listSupplyExport, open, onCancel, handleExportExcel }: Props) => {
  const columns: any = [
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
      title: 'Số lượng nhập',
      dataIndex: 'quantityImport',
      width: 150,
    },
    {
      title: 'Số lượng xuất',
      dataIndex: 'quantityExport',
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
            <span className={styles.name}>Thông tin xuất kho</span>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={listSupplyExport.map((e) => ({
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
            <CommonButton onClick={() => handleExportExcel(listSupplyExport)}>
              Xuất Excel
            </CommonButton>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ModalReportInventory;
