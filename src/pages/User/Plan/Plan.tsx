import React, { useState } from 'react';
import { Col, Divider, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import CommonButton from 'components/CommonButton/CommonButton';
import styles from './style.module.scss';
import useService from './service';
import { listTypePlanImport } from 'const';
import moment from 'moment';
import { toast } from 'react-toastify';

const Plan: React.FC = () => {
  const columns: any = [
    {
      title: 'Mã',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Tên vật tư',
      width: 250,
      dataIndex: 'name',
      fixed: 'left',
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
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: '',
      fixed: 'right',
      width: 100,
      render: (_, record: any) => (
        <CommonButton danger onClick={() => onRemove(record)}>
          Xóa
        </CommonButton>
      ),
    },
  ];
  const [formSubmit] = useForm();
  const [form] = useForm();
  const [dataAdd, setDataAdd] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const [selectSupply, setSelectSupply] = useState<any>({});
  const [typePlan, setTypePlan] = useState<number>(0);

  const { listSupply, handleSendPlan, currentUser, loadSend, socket } = useService({ value });
  const handleSelectSupply = (id: string) => {
    const supply = listSupply.find((d) => d.id === id);
    setSelectSupply(supply);
    form.setFieldsValue({
      ingredient: supply.ingredient,
      id: supply.id,
      group: supply.group.name,
      company: supply.company.name,
      unit: supply.unit.name,
      quantityStore: supply.quantity,
    });
  };

  const handleAddData = (data: any) => {
    const checkExist = dataAdd.find((d) => d.id === data.id);
    if (checkExist) {
      const sum = checkExist.quantity + data.quantity;
      const quantityStore = form.getFieldValue('quantityStore');
      if (sum > quantityStore) {
        toast.error('Số lượng vật tư yêu cầu vượt quá trong kho');
        return;
      } else {
        const remain = dataAdd.map((d) =>
          d.id === data.id ? { ...d, quantity: d.quantity + data.quantity } : d,
        );
        setDataAdd(remain);
        form.resetFields();
        return;
      }
    }
    setDataAdd([...dataAdd, { ...data, name: selectSupply.name }]);
    form.resetFields();
  };

  const onRemove = (record) => {
    const remainData = dataAdd.filter((d) => d.id !== record.id);
    setDataAdd(remainData);
  };
  const handleSubmit = ({ note }: { note: string }) => {
    const dataSend = {
      note,
      department: currentUser.department,
      name: currentUser.displayName,
      planList: dataAdd.map((s) => ({ id: s.id, quantity: s.quantity })),
      typePlan,
      createdTime: moment(Date.now()).format('DD MMM YYYY'),
    };
    handleSendPlan(dataSend);
    socket?.emit('sendPlan', {
      department: currentUser.department,
      name: currentUser.displayName,
      typePlan,
    });
  };

  return (
    <div className={styles.wapper}>
      <Divider style={{ marginTop: '0px' }}>Yêu cầu cấp vật tư</Divider>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        form={formSubmit}
        name="form-submit"
      >
        <Row gutter={[8, 0]} align={'bottom'} justify={'space-between'}>
          <Col span={8} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <Form.Item name="typePlan">
              <span>Loại phiếu bổ sung</span>
              <Select
                onChange={(e) => setTypePlan(e)}
                options={listTypePlanImport}
                placeholder="Chọn loại phiếu"
              />
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <Form.Item>
              <CommonButton loading={loadSend} isSubmit={true}>
                Tạo phiếu cấp vật tư
              </CommonButton>
            </Form.Item>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={dataAdd}
          size="middle"
          scroll={{ x: 'max-content', y: '500px' }}
          style={{ marginBottom: '20px' }}
        />
        <span>Ghi chú</span>
        <Form.Item noStyle name="note">
          <Input.TextArea style={{ marginBottom: '30px' }} />
        </Form.Item>
      </Form>
      <div className={styles.control}>
        <Form
          initialValues={{ remember: true }}
          onFinish={handleAddData}
          autoComplete="off"
          form={form}
          name="form-add"
        >
          <Row gutter={[8, 0]}>
            <Col span={4}>
              <span>Mã</span>
              <Form.Item noStyle name="id">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={20}>
              <span>Tên vật tư</span>
              <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng chọn vật tư' }]}>
                <Select
                  showSearch
                  value={value}
                  placeholder="Nhap ten vat tu"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={(e) => setValue(e)}
                  onChange={(e) => handleSelectSupply(e)}
                  notFoundContent={null}
                  options={
                    typePlan === 1
                      ? listSupply
                          .filter((x) => x.isLoss)
                          .map((s) => ({ value: s.id, label: s.name }))
                      : listSupply
                          .filter((x) => !x.isLoss)
                          .map((s) => ({ value: s.id, label: s.name }))
                  }
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Hoạt chất</span>
              <Form.Item
                noStyle
                name="ingredient"
                rules={[{ required: true, message: 'Vui lòng chọn vật tư' }]}
              >
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Nhóm</span>
              <Form.Item noStyle name="group">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Nhà cung cấp</span>
              <Form.Item noStyle name="company">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Đơn vị</span>
              <Form.Item noStyle name="unit">
                <Input style={{ marginBottom: '10px' }} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Số lượng</span>
              <Form.Item
                name="quantity"
                rules={[{ required: true, message: 'Vui long dien so luong can nhap' }]}
              >
                <InputNumber
                  min={1}
                  max={selectSupply ? Number(selectSupply.quantity) : 1}
                  type="number"
                  style={{ marginBottom: '10px', width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Tồn kho</span>
              <Form.Item name="quantityStore">
                <InputNumber
                  min={1}
                  readOnly
                  type="number"
                  style={{ marginBottom: '10px', width: '100%' }}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className={styles.bottom}>
                <Form.Item>
                  <CommonButton isSubmit={true}>Thêm vào bảng</CommonButton>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Plan;
