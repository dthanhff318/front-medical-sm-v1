import { Col, Form, Input, Modal, Row, Select, DatePicker } from 'antd';
import React, { useState } from 'react';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { TCreateDepartments } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
import useService from './service';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
type Props = {
  open: boolean;
  onAdd: () => void;
  onCancel: () => void;
};
const { RangePicker } = DatePicker;

const ModalAddSupply = ({ open, onAdd, onCancel }: Props) => {
  const [form] = useForm();
  const { findBidding, findLoading } = useSelector((state: RootState) => state.bidding);
  const [value, setValue] = useState<string>('');
  const {} = useService({ value });
  console.log(findBidding);
  const [data, setData] = useState<any>([]);
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          onFinish={(data: TCreateDepartments) => {
            onAdd();
            form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[8, 0]}>
            <Col
              span={24}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Tên vật tư</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten vat tu' }]}
              >
                <Select
                  showSearch
                  value={value}
                  placeholder="Nhap ten vat tu"
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={(e) => setValue(e)}
                  onChange={() => console.log('change')}
                  notFoundContent={null}
                  options={findBidding.map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Hoạt chất</span>
              <Form.Item noStyle name="ingredient">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Nhóm</span>
              <Form.Item noStyle name="group">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Hãng sản xuất</span>
              <Form.Item noStyle name="brand">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Nhà sản xuất</span>
              <Form.Item noStyle name="company">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Nước SX</span>
              <Form.Item noStyle name="country">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Mã hóa đơn</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Mã</span>
              <Form.Item noStyle name="code">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>

            <Col span={6}>
              <span>Số lượng</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien so luong can nhap' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Số lượng thầu</span>
              <Form.Item noStyle name="name">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Đơn vị</span>
              <Form.Item noStyle name="unit">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Ngày hết hạn</span>
              <Form.Item
                noStyle
                name="dateExprired"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <RangePicker style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>

            <Col span={8}>
              <span>Lô SX</span>
              <Form.Item
                noStyle
                name="productCode"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Giá vật tư</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <span>Tổng tiền</span>
              <Form.Item noStyle name="totalPrice">
                <Input style={{ marginBottom: '10px' }} disabled />
              </Form.Item>
            </Col>
            <Col
              span={8}
              style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}
            >
              <span>Ngày nhập</span>
              <Form.Item
                noStyle
                name="date"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <DatePicker onChange={() => {}} style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <div className={styles.bottom}>
                <Form.Item>
                  <CommonButton isSubmit={true}>Tạo phiếu nhập</CommonButton>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalAddSupply;
