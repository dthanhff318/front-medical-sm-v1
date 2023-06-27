import React from 'react';
import { Column } from '@ant-design/plots';
import styles from './Analysis.module.scss';
import { Col, Row, Select, Tabs, TabsProps } from 'antd';
import useService from './service';
import OverviewAnalysis from './component/AnalysisOverview';
import AnalysisDetail from './component/AnalysisDetail';
import AnalysisClassify from './component/AnalysisClassify';

type Props = {};

const Analysis = (props: Props) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Tổng quan`,
      children: <OverviewAnalysis />,
    },
    {
      key: '2',
      label: `Chi tiết nhập xuất`,
      children: <AnalysisDetail />,
    },
    {
      key: '3',
      label: `Thống kê phân loại`,
      children: <AnalysisClassify />,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Analysis;
