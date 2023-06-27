import React from 'react';
import { Column } from '@ant-design/plots';
import styles from '../Analysis.module.scss';
import { Col, Row, Select, Tabs, TabsProps } from 'antd';
import useService from '../service';

type Props = {};

const AnalysisDetail = (props: Props) => {
  const { listYear, listGroup, dataAnalysis, setYear } = useService();

  const data = [
    {
      month: 'Tháng1',
      type: 'Xuất',
      order_amt: 8,
      product_sub_type: 'Nhóm1',
    },
    {
      month: 'Tháng1',
      type: 'Nhập',
      order_amt: 10,
      product_sub_type: 'Nhóm2',
    },
    {
      month: 'Tháng1',
      type: 'Nhập',
      order_amt: 12,
      product_sub_type: 'Nhóm3',
    },
    {
      month: 'Tháng2',
      type: 'Xuất',
      order_amt: 20,
      product_sub_type: '砚台',
    },
    {
      month: 'Tháng2',
      type: 'Nhập',
      order_amt: 13,
      product_sub_type: '砚台',
    },
  ];

  const config = {
    data,
    xField: 'month',
    yField: 'order_amt',
    isGroup: true,
    isStack: true,
    seriesField: 'product_sub_type',
    groupField: 'type',
  };
  const handleChange = (e) => {
    setYear(e);
  };

  return (
    <>
      <h2 className={styles.title}>Thống kế chi tiết xuất nhập vật tư</h2>
      <p className={styles.subTitle}>Thống kê vật tư xuất theo tháng</p>
      <Row gutter={[40, 40]} style={{ marginBottom: '3rem' }}>
        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
          <span className={styles.selectTitle}>Nhóm vật tư:</span>
          <Select
            defaultValue={'Tất cả'}
            style={{ width: '100%' }}
            onChange={handleChange}
            options={listGroup}
          />
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
    </>
  );
};

export default AnalysisDetail;
