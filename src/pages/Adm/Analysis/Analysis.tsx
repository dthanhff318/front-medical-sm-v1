import React from 'react';
import { Column } from '@ant-design/plots';
import styles from './Analysis.module.scss';
import { Col, Row, Select, Tabs, TabsProps } from 'antd';
import useService from './service';
import OverviewAnalysis from './component/AnalysisOverview';

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
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Analysis;
