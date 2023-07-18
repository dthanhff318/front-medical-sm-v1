import React from 'react';
import { Column, Rose } from '@ant-design/plots';
import styles from '../Analysis.module.scss';
import { Col, Row, Select, Tabs, TabsProps } from 'antd';
import useService from '../service';

type Props = {};

const AnalysisClassify = (props: Props) => {
  const { dataClassify } = useService();

  const config = {
    data: dataClassify,
    xField: 'name',
    yField: 'count',
    seriesField: 'name',
    radius: 0.9,
    label: {
      offset: -15,
    },
  };

  return (
    <>
      <h2 className={styles.title}>Thống kê phân loại</h2>
      <Row gutter={[40, 40]} style={{ marginBottom: '3rem' }}>
        <Col span={24}>
          <p className={styles.subTitle}>Phân loại số lượng vật tư theo nhóm</p>
          <Rose {...(config as any)} />
        </Col>
      </Row>
    </>
  );
};

export default AnalysisClassify;
