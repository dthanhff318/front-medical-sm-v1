import React from 'react';
import { Column } from '@ant-design/plots';
import styles from './Analysis.module.scss';
import { Col, Row, Select } from 'antd';
import useService from './service';

type Props = {};

const Analysis = (props: Props) => {
  const { groups, listYear, listGroup } = useService();
  const data = [
    {
      type: 'Tháng 1',
      sales: 38,
    },
    {
      type: 'Tháng 2',
      sales: 52,
    },
    {
      type: 'Tháng 3',
      sales: 61,
    },
    {
      type: 'Tháng 4',
      sales: 145,
    },
    {
      type: 'Tháng 5',
      sales: 48,
    },
    {
      type: 'Tháng 6',
      sales: 38,
    },
    {
      type: 'Tháng 7',
      sales: 38,
    },
    {
      type: 'Tháng 8',
      sales: 38,
    },
    {
      type: 'Tháng 9',
      sales: 38,
    },
    {
      type: 'Tháng 10',
      sales: 38,
    },
    {
      type: 'Tháng 11',
      sales: 38,
    },
    {
      type: 'Tháng 12',
      sales: 380,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Tháng',
      },
      sales: {
        alias: 'Số lượng',
      },
    },
  };
  const handleChange = () => {};
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Thống kế xuất nhập vật tư</h2>
      <Row gutter={[40, 40]} style={{ marginBottom: '3rem' }}>
        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
          <span className={styles.selectTitle}>Nhóm vật tư:</span>
          <Select style={{ width: '100%' }} onChange={handleChange} options={listGroup} />
        </Col>
        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
          <span className={styles.selectTitle}>Năm:</span>
          <Select
            defaultValue={listYear()[0].value}
            style={{ width: '100%' }}
            onChange={handleChange}
            options={listYear()}
          />
        </Col>
      </Row>
      <Column {...(config as any)} />
    </div>
  );
};

export default Analysis;
