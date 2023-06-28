import React from 'react';
import { Column } from '@ant-design/plots';
import styles from '../Analysis.module.scss';
import { Col, Row, Select } from 'antd';
import useService from '../service';

type Props = {};

const AnalysisDetail = (props: Props) => {
  const { listYear, listGroup, dataDetail, setYear } = useService();

  const config = {
    data: dataDetail,
    xField: 'month',
    yField: 'quantity',
    isGroup: true,
    isStack: true,
    seriesField: 'group',
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
