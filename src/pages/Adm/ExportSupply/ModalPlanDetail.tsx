import { Form, Input, Modal, Row, Table, Col, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanDetail, savePlanDetail, savePlans } from 'store/slices/planSlice';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';
import planApi from 'axiosConfig/api/plan';

type Props = {
  open: number;
  onCancel: () => void;
};
export type EditableCellProps = {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'select' | 'text';
  record: string;
  index: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

const ModalPlanDetail = ({ open, onCancel }: Props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { planDetail, loading } = useSelector((state: RootState) => state.plan);
  const [editingKey, setEditingKey] = useState(0);
  const [load, setLoad] = useState<boolean>(false);

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

  useEffect(() => {
    if (open) dispatch(getPlanDetail(open) as any);
  }, [open]);
  const handleAccept = async () => {
    try {
      setLoad(true);
      const data = planDetail.planList.map((e) => {
        const { id, quantityExpect } = e;
        return { id, quantityExpect };
      });
      const res = await planApi.acceptPlan(planDetail.id, data);
      dispatch(savePlans(res.data));
      onCancel();
      setLoad(false);
    } catch (e) {
      setLoad(false);
    }
  };
  return (
    <Modal open={!!open} footer={null} onCancel={onCancel} width={'70vw'}>
      <div className={styles.wrapperModal}>
        <p className={styles.modalTitle}>Thông tin chi tiết phiếu</p>
        <p>Người gửi: {planDetail.name}</p>
        <p>Khoa phòng: {planDetail.department?.name}</p>
        <p>Ghi chú: {planDetail.note}</p>
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
            loading={loading}
          />
        </Form>
      </div>
      <Row justify="center" gutter={[40, 40]}>
        {planDetail.isAccepted ? (
          <>
            <Col>
              <CommonButton danger onClick={onCancel} loading={load}>
                Xóa phiếu
              </CommonButton>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <CommonButton onClick={handleAccept} loading={load}>
                Phê duyệt
              </CommonButton>
            </Col>
            <Col>
              <CommonButton danger onClick={onCancel}>
                Hủy bỏ
              </CommonButton>
            </Col>
          </>
        )}
      </Row>
    </Modal>
  );
};

export default ModalPlanDetail;
