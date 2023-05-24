import { Form, Input, Modal, Row, Table, Col, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanDetail } from 'store/slices/planSlice';
import { RootState } from 'store';
import CommonButton from 'components/CommonButton/CommonButton';
import { IndexedObject } from 'types/common';
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
  const { planDetail } = useSelector((state: RootState) => state.plan);
  const [editingKey, setEditingKey] = useState(0);

  const columns: any = [
    {
      title: 'Mã',
      dataIndex: 'code',
      width: 100,
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
      width: 100,
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
      editable: true,
      render: (_: any, record: any) => (
        <CommonButton
          onClick={() => {
            console.log(record.id);

            edit(record.id);
          }}
        >
          Edit
        </CommonButton>
      ),
    },
  ];

  const editableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    children,
    ...restProps
  }) => {
    const inputNode = <InputNumber />;
    let rulesValidate: IndexedObject[] = [{ required: true }];

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item name={dataIndex} style={{ margin: 0 }} rules={rulesValidate}>
            {inputNode}
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

  const save = async (id: number) => {
    // const row = (await form.validateFields()) as TUserDetail;
    // if (row) {
    //   setUsers({ user: { ...row, id }, groupId: currentGroup.id ?? 0 });
    //   setEditingKey(0);
    // }
  };
  const edit = (id: number) => {
    // form.setFieldsValue({ ...record });
    setEditingKey(id);
  };
  console.log(editingKey);

  useEffect(() => {
    if (open) dispatch(getPlanDetail(open) as any);
  }, [open]);
  const handleAccept = () => {};
  return (
    <Modal open={!!open} footer={null} onCancel={onCancel} width={'70vw'}>
      <div className={styles.wrapperModal}>
        <p className={styles.modalTitle}>Thông tin chi tiết phiếu</p>
        <p>Người gửi: {planDetail.name}</p>
        <p>Khoa phòng: {planDetail.department?.name}</p>
        <p>Ghi chú: {planDetail.note}</p>
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
        />
      </div>
      <Row justify="center" gutter={[40, 40]}>
        <Col>
          <CommonButton onClick={handleAccept}>Phê duyệt</CommonButton>
        </Col>
        <Col>
          <CommonButton danger>Hủy bỏ</CommonButton>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPlanDetail;
