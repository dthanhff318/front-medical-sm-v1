import { Checkbox, Form, Input, Modal, Radio, Row } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { TCreateStaff } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
type Props = {
  open: boolean;
  onCreateStaff: (data: TCreateStaff) => void;
  onCancel: () => void;
};

const ModalCreateStaff = ({ open, onCreateStaff, onCancel }: Props) => {
  const [form] = useForm();
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(data: TCreateStaff) => {
            onCreateStaff(data);
            form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <strong>Tên nhân viên</strong>
          <Form.Item
            name="displayName"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <strong>Email</strong>
          <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input />
          </Form.Item>

          <strong>Tài khoản</strong>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tai khoan' }]}
          >
            <Input />
          </Form.Item>

          <strong>Mật khẩu</strong>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mat khau' }]}
          >
            <Input />
          </Form.Item>
          <strong>Chức năng</strong>
          <Form.Item
            name="permission"
            rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
          >
            <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Row>
                <Checkbox value="admin-add">Nhập kho</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-store">Tổng kho</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-report">Báo cáo</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-department">Khoa phòng</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-ticket">Phiếu duyệt</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-company">Nhà cung cấp</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-category">Danh mục</Checkbox>
              </Row>
              <Row>
                <Checkbox value="admin-analysis">Thống kê</Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton isSubmit={true}>Tạo nhân viên</CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateStaff;
