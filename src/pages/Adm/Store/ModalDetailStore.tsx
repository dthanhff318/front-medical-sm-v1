import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useState } from 'react';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { TCreateDepartments } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { TSupply } from 'types/supply';
type Props = {
  open: boolean;
  onCancel: () => void;
  itemSupply: {
    brand?: string;
    code?: string;
    codeBidding?: string;
    company?: string;
    country?: string;
    dateExpired?: string;
    group?: string;
    id?: number;
    ingredient?: string;
    name?: string;
    productCode?: string;
    quantity?: number;
    unit?: string;
    yearBidding?: number;
  };
};

const ModalCreateDepartment = ({ itemSupply, open, onCancel }: Props) => {
  const [form] = useForm();
  const [value, setValue] = useState<string>('');
  const { suppliers } = useSelector((state: RootState) => state.supplier);

  const values = {
    name: itemSupply.name,
    brand: itemSupply.brand,
    code: itemSupply.code,
    codeBidding: itemSupply.codeBidding,
    company: itemSupply.company,
    country: itemSupply.country,
    dateExpired: itemSupply.dateExpired,
    group: itemSupply.group,
    ingredient: itemSupply.ingredient,
    productCode: itemSupply.productCode,
    quantity: itemSupply.quantity,
    unit: itemSupply.unit,
    yearBidding: itemSupply.yearBidding,
  };
  form.setFieldsValue(values);

  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          onFinish={(data: TSupply) => {
            console.log(data);
            // onCreateDepartment(data);
            // form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <Row justify="space-between">
            <Col span={24}>
              <span>Tên vật tư</span>
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Hoạt chất</span>
              <Form.Item
                name="ingredient"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Nhóm</span>
              <Form.Item
                name="group"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Tên công ty</span>
              <Form.Item
                noStyle
                name="company"
                rules={[{ required: true, message: 'Vui long chọn nhà cung cấp' }]}
              >
                <Select
                  showSearch
                  value={value}
                  placeholder="Chọn nhà cung cấp"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={true}
                  filterOption={false}
                  onSearch={(e) => setValue(e)}
                  //onChange={(e) => handleSelectCompany(e)}
                  notFoundContent={null}
                  options={
                    value
                      ? suppliers.map((d) => ({
                          value: d.id,
                          label: d.name,
                        }))
                      : []
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Tên hãng</span>
              <Form.Item
                name="brand"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Tên nước</span>
              <Form.Item
                name="country"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Đơn vị</span>
              <Form.Item
                name="unit"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Hạn sử dụng</span>
              <Form.Item
                name="dateExpired"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Lô SX</span>
              <Form.Item
                name="productCode"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Mã thầu</span>
              <Form.Item
                name="codeBidding"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Số lượng</span>
              <Form.Item
                name="quantity"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton isSubmit={true}>Lưu vật tư</CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateDepartment;
