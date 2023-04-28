import { Col, Form, Input, Modal, Row } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { TCreateDepartments } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
type Props = {
  open: boolean;
  onCreateDepartment: (data: TCreateDepartments) => void;
  onCancel: () => void;
};

const ModalCreateDepartment = ({ open, onCreateDepartment, onCancel }: Props) => {
  const [form] = useForm();
  return (
    <Modal open={open} footer={null} onCancel={onCancel} width={1000}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          onFinish={(data: TCreateDepartments) => {
            onCreateDepartment(data);
            form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[8, 0]}>
            <Col span={24}>
              <span>Tên vật tư</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Hoạt chất</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Nhóm</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Nhà cung cấp</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Tên vật tư</span>
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
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
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
              <span>Số lượng</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Số lượng thầu</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Đơn vị</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Ngày hết hạn</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Nước SX</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Hãng SX</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Lô SX</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Giá vật tư</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <span>Tổng tiền</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span>Ngày nhập</span>
              <Form.Item
                noStyle
                name="name"
                rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
              >
                <Input style={{ marginBottom: '10px' }} />
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

export default ModalCreateDepartment;
