import React from 'react';
import { Column } from '@ant-design/plots';
import styles from '../Analysis.module.scss';
import { Col, Row, Select, Tabs, TabsProps } from 'antd';
import useService from '../service';

type Props = {};

const OverviewAnalysis = (props: Props) => {
  const { listYear, listGroup, dataAnalysis, setYear } = useService();

  const config = {
    data: dataAnalysis,
    isGroup: true,
    xField: 'month',
    yField: 'count',
    seriesField: 'name',
    label: {
      position: 'middle',

      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  const handleChange = (e) => {
    setYear(e);
  };

  return (
    <>
      <h2 className={styles.title}>Thống kế xuất nhập vật tư</h2>
      <Row gutter={[40, 40]} style={{ marginBottom: '3rem' }}>
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
    </>
  );
};

export default OverviewAnalysis;
