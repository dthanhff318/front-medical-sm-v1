import React from 'react';
import { Col, Row, Table } from 'antd';
import CommonButton from 'components/CommonButton/CommonButton';
import useService from './service';
import PaginationCustom from 'components/PaginationCustom/PaginationCustom';
import { useLocation, useNavigate } from 'react-router-dom';
import { createQueryUrl, getNameByTicketType, replacePathParams } from 'helpers/functions';
import styles from './style.module.scss';
import MPath from 'routes/routes';

const TicketHistory: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pagination, urlQueryParams, loading, plans } = useService();

  const onChangePage = (page: number, limit: number) => {
    navigate(createQueryUrl(location, { ...urlQueryParams, page, limit }));
  };

  const columns: any = [
    {
      title: 'Loại dự trù',
      width: 200,
      dataIndex: 'typePlan',
    },
    {
      title: 'Người gửi',
      width: 230,
      dataIndex: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 120,
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdTime',
      width: 200,
    },
    {
      title: '',
      fixed: 'right',
      width: 100,
      render: (_, record: any) => (
        <CommonButton
          onClick={() =>
            navigate(replacePathParams(MPath.USER_TICKET_HISTORY_DETAIL, { id: record.id }))
          }
        >
          Chi tiết
        </CommonButton>
      ),
    },
  ];
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Danh sách phiếu gửi</h2>
      <Row gutter={[8, 0]} style={{ marginBottom: '20px' }}>
        <Col span={8}></Col>
      </Row>
      <Table
        columns={columns}
        loading={loading}
        dataSource={plans.map((e) => {
          const type = e.typePlan;
          let namePlan;
          if (type === 1) {
            namePlan = 'Yêu cầu hao phí';
          } else if (type === 2) {
            namePlan = 'Yêu cầu Cơ số tủ trực';
          } else if (type === 3) {
            namePlan = 'Hoàn trả Hao phí';
          } else if (type === 4) {
            namePlan = 'Hoàn trả Cơ số tủ trực';
          }
          return {
            ...e,
            status: e.isAccepted ? 'Đã duyệt' : 'Chờ duyệt',
            typePlan: getNameByTicketType(e.typePlan),
          };
        })}
        size="middle"
        scroll={{ x: 'max-content', y: '60vh' }}
        rowKey="id"
        pagination={false}
      />
      <Row justify={'center'} style={{ marginTop: '20px' }}>
        <PaginationCustom
          total={pagination.totalResults}
          current={pagination.page}
          pageSize={pagination.limit}
          onChange={onChangePage}
        />
      </Row>
    </div>
  );
};

export default TicketHistory;
