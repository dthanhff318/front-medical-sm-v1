import React from 'react';
import { Col, Input, Space, Row, Table, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './style.module.scss';
import Search from 'antd/es/input/Search';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
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
    width: 100,
    render: () => <a>action</a>,
  },
];

const data: DataType[] = [];
for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    name: ` ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const onSearch = (value: string) => console.log(value);
const AddSupply: React.FC = () => {
  return (
    <div className={styles.wapper}>
      <Row gutter={[8, 0]} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Space direction="vertical">
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: '100%' }} />
          </Space>
        </Col>
        <Col span={8}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '1',
                label: 'Not Identified',
              },
              {
                value: '2',
                label: 'Closed',
              },
              {
                value: '3',
                label: 'Communicated',
              },
              {
                value: '4',
                label: 'Identified',
              },
              {
                value: '5',
                label: 'Resolved',
              },
              {
                value: '6',
                label: 'Cancelled',
              },
            ]}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        scroll={{ x: 'max-content', y: '59vh' }}
      />
    </div>
  );
};

export default AddSupply;
