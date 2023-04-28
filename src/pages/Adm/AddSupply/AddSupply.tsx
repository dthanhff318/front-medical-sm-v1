import React, { useState } from 'react';
import { Divider, Table } from 'antd';
import { Button, Radio, Space } from 'antd';
import type { SpaceSize } from 'antd/es/space';
import type { ColumnsType } from 'antd/es/table';
import styles from './style.module.scss';
import ModalAddSupply from './ModalAddSupply';
import useService from './service';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
type TModal = '' | 'delete' | 'create';
const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    width: 60,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>action</a>,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    name: ` ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const AddSupply: React.FC = () => {
  const [openModal, setOpenModal] = useState<TModal>('');
  const { departmentListMapping, onCreateDepartment, handleDeleteDepartment } = useService();
  return (
    <div className={styles.wapper}>
      <Divider style={{ marginTop: '0px' }}>Bảng Phiếu nhập vật tư</Divider>
      <Table columns={columns} dataSource={data} size="middle" scroll={{ x: 1500, y: 300 }} />
      <ModalAddSupply
        open={openModal === 'create'}
        onCreateDepartment={onCreateDepartment}
        onCancel={() => setOpenModal('')}
      />
      <div className={styles.control}>
        <Space size={'small'} className={styles.control}>
          <Button className={styles.btn} onClick={() => setOpenModal('create')} type="dashed">
            Mới
          </Button>
          <Button className={styles.btn}>Sửa</Button>
          <Button className={styles.btn} type="dashed">
            Hủy
          </Button>
          <Button className={styles.btn} type="dashed">
            Xóa
          </Button>
          <Button className={styles.btn} type="link">
            In
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default AddSupply;
