import React from 'react';
import { Column } from '@ant-design/plots';
import styles from '../Analysis.module.scss';
import { Col, Row, Select, Tabs, TabsProps } from 'antd';
import useService from '../service';

type Props = {};

const OverviewAnalysis = (props: Props) => {
  const { listYear, listGroup, dataAnalysis, setYear } = useService();

  const data = [
    {
      name: 'Nhập',
      month: 'Jan.',
      count: 18.9,
    },
    {
      name: 'Nhập',
      month: 'Feb.',
      count: 28.8,
    },

    {
      name: 'Xuất',
      month: 'Jan.',
      count: 12.4,
    },
    {
      name: 'Xuất',
      month: 'Feb.',
      count: 23.2,
    },
  ];

  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'count',
    seriesField: 'name',

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };
  //   const config = {
  //     data: dataAnalysis,
  //     xField: 'month',
  //     yField: 'quantity',
  //     color: ({ month }) => {
  //       const checkCount = dataAnalysis.find((e: any) => e.month === month) as any;
  //       if (checkCount.quantity < 20) {
  //         return '#F4664A';
  //       }
  //       return '#5B8FF9';
  //     },
  //     label: {
  //       position: 'middle',
  //       style: {
  //         fill: '#FFFFFF',
  //         opacity: 0.6,
  //       },
  //     },
  //     xAxis: {
  //       label: {
  //         autoHide: true,
  //         autoRotate: false,
  //       },
  //     },
  //     meta: {
  //       month: {
  //         alias: 'Tháng',
  //       },
  //       quantity: {
  //         alias: 'Số lượng',
  //       },
  //     },
  //   };
  const handleChange = (e) => {
    setYear(e);
  };

  return (
    <>
      <h2 className={styles.title}>Thống kế xuất nhập vật tư</h2>
      <Row gutter={[40, 40]} style={{ marginBottom: '3rem' }}>
        <Col span={8} style={{ display: 'flex', alignItems: 'center' }}>
          <span className={styles.selectTitle}>Nhóm vật tư:</span>
          <Select
            defaultValue="Tất cả"
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

export default OverviewAnalysis;
