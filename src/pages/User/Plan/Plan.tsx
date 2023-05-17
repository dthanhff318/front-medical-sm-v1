import React, { useState } from 'react';
import { Col, Divider, Form, Input, InputNumber, Row, Select, Table } from 'antd';
import { useForm } from 'antd/es/form/Form';
import CommonButton from 'components/CommonButton/CommonButton';
import styles from './style.module.scss';
import useService from './service';

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
      <CommonButton danger onClick={() => console.log(record)}>
        Xóa
      </CommonButton>
    ),
  },
];

const Plan: React.FC = () => {
  const [formSubmit] = useForm();
  const [form] = useForm();
  const [dataAdd, setDataAdd] = useState<any>([]);
  const [value, setValue] = useState<string>('');
  const [selectSupply, setSelectSupply] = useState<any>('');

  const { listSupply, handleSendPlan, currentUser } = useService({ value });

  const handleSelectSupply = (id: string) => {
    const supply = listSupply.find((d) => d.id === id);
    setSelectSupply(supply);
    form.setFieldsValue({
      ingredient: supply.ingredient,
      id: supply.id,
      group: supply.group,
      company: supply.company.name,
      unit: supply.unit,
    });
  };
  const handleChangeQuantity = (e) => {
    const cost = form.getFieldValue('price');
    form.setFieldValue('totalPrice', e * cost);
  };

  const handleAddData = (data: any) => {
    const checkExist = dataAdd.find((d) => d.id === data.id);
    if (checkExist) {
      const remain = dataAdd.map((d) =>
        d.id === data.id ? { ...d, quantity: d.quantity + data.quantity } : d,
      );
      setDataAdd(remain);
      return;
    }
    setDataAdd([...dataAdd, { ...data, name: selectSupply.name }]);
  };

  const handleSubmit = (data: { note: string }) => {
    const { note } = data;
    const planData = {
      note,
      department: currentUser.department,
      name: currentUser.displayName,
      planList: dataAdd.map((s) => ({ id: s.id, quantity: s.quantity })),
    };
    handleSendPlan(planData);
  };

  return (
    <div className={styles.wapper}>
      <Divider style={{ marginTop: '0px' }}>Bảng Phiếu nhập vật tư</Divider>
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
        form={formSubmit}
        name="form-submit"
      >
        <Row gutter={[8, 0]}>
          <Col span={16}>
            <span>Ghi chú</span>
            <Form.Item noStyle name="note">
              <Input.TextArea style={{ marginBottom: '10px' }} />
            </Form.Item>
          </Col>
          <Col span={8} style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
            <span>---</span>
            <Form.Item>
              <CommonButton isSubmit={true}>Nhập kho</CommonButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={dataAdd}
        size="middle"
        scroll={{ x: 'max-content', y: '500px' }}
        style={{ marginBottom: '20px' }}
      />
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
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui lòng chọn vật tư' }]}
              >
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
                  options={listSupply.map((s) => ({ value: s.id, label: s.name }))}
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
            <Col span={4}>
              <span>Số lượng</span>
              <Form.Item
                noStyle
                name="quantity"
                rules={[{ required: true, message: 'Vui long dien so luong can nhap' }]}
              >
                <InputNumber
                  min={1}
                  max={selectSupply ? Number(selectSupply.quantity) : 1}
                  type="number"
                  // disabled={Number(selectSupply?.remainCount) ? false : true}
                  style={{ marginBottom: '10px', width: '100%' }}
                  onChange={handleChangeQuantity}
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
