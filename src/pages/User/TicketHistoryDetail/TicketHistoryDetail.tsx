import React, { useState } from 'react';
import CommonButton from 'components/CommonButton/CommonButton';
import MPath from 'routes/routes';
import { useNavigate } from 'react-router-dom';
import useService, { EditableCellProps } from './service';
import styles from './style.module.scss';
import { Col, Form, InputNumber, Row, Table } from 'antd';
import { savePlanDetail } from 'store/slices/planSlice';
import { useDispatch } from 'react-redux';
import { RollbackOutlined } from '@ant-design/icons';
import { getNameByTicketType } from 'helpers/functions';

const TicketHistoryDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { planDetail, loading: loadingTable, handleAcceptTicket } = useService();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);
  const columns: any = [
    {
      title: 'Mã',
      dataIndex: 'code',
      width: 80,
    },
    {
      title: 'Tên vật tư',
      width: 250,
      dataIndex: 'name',
    },
    {
      title: 'Hoạt chất',
      width: 150,
      dataIndex: 'ingredient',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      width: 80,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantityExpect',
      editable: true,
      width: 100,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'dateExpired',
      width: 160,
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      width: 250,
    },
    {
      title: 'Tên hãng',
      dataIndex: 'brand',
      width: 250,
    },
    {
      title: 'Tên nước',
      dataIndex: 'country',
      width: 150,
    },
    {
      title: 'Lô SX',
      dataIndex: 'productCode',
      width: 100,
    },
    {
      key: 'action',
      title: '',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (_: any, record: any) => {
        return isEditingQuatity(record, editingKey) ? (
          <CommonButton
            onClick={() => {
              save();
            }}
          >
            Lưu
          </CommonButton>
        ) : (
          <CommonButton
            onClick={() => {
              edit(record.id);
            }}
          >
            Sửa
          </CommonButton>
        );
      },
    },
  ];

  const editableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    children,
    ...restProps
  }) => {
    const rulesValidate = [
      {
        validator: (_, value) =>
          value > 0 && value < planDetail.planList?.find((e) => e.id === editingKey).quantity
            ? Promise.resolve()
            : Promise.reject(new Error('Vui lòng nhập số lượng hợp lệ')),
      },
    ];
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rulesValidate}>
            <InputNumber onBlur={save} />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditingQuatity(record, editingKey),
      }),
    };
  });
  const isEditingQuatity = (record: any, editingKey: number) => record.id === editingKey;

  const save = async () => {
    const row = await form.validateFields();
    if (row) {
      const updatePlan = planDetail.planList.map((e) =>
        e.id === editingKey ? { ...e, ...row } : e,
      );
      dispatch(savePlanDetail({ ...planDetail, planList: updatePlan }));
      setEditingKey(0);
    }
  };
  const edit = (id: number) => {
    setEditingKey(id);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Chi tiết phiếu gửi</h2>
        <CommonButton onClick={() => navigate(MPath.USER_TICKET_HISTORY)}>
          <RollbackOutlined />
        </CommonButton>
        <div className={styles.content}>
          <p className={styles.info}>
            Người gửi: <i>{planDetail.name}</i>
          </p>
          <p className={styles.info}>
            Loại phiếu: <i>{getNameByTicketType(planDetail.typePlan)}</i>
          </p>
          <p className={styles.info}>
            Ghi chú: <i>{planDetail.note}</i>
          </p>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: editableCell,
                },
              }}
              style={{ margin: '20px 0' }}
              columns={mergedColumns}
              dataSource={planDetail.planList?.map((c) => ({ ...c, supplier: c.company?.name }))}
              size="middle"
              bordered
              scroll={{ x: 'max-content', y: '500px' }}
              rowKey="id"
              loading={loadingTable}
            />
          </Form>
          <Row justify="center" gutter={[40, 40]}>
            {planDetail.isAccepted ? (
              <>
                <Col>
                  <CommonButton danger>Xóa phiếu</CommonButton>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <CommonButton onClick={handleAcceptTicket} loading={false}>
                    Phê duyệt
                  </CommonButton>
                </Col>
                <Col>
                  <CommonButton danger>Hủy bỏ</CommonButton>
                </Col>
              </>
            )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default TicketHistoryDetail;
