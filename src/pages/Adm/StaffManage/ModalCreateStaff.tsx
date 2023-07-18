import { Form, Input, Modal, Radio } from 'antd';
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

          <strong>Chức vụ</strong>
          <Form.Item name="role" rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}>
            <Radio.Group>
              <Radio value="staff-accept">Nhân viên quản lý vật tư</Radio>
              <Radio value="staff-report">Nhân viên quản lý báo cáo</Radio>
            </Radio.Group>
          </Form.Item>

          <span>Email</span>
          <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
            <Input />
          </Form.Item>

          <span>Tài khoản</span>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tai khoan' }]}
          >
            <Input />
          </Form.Item>

          <span>Mật khẩu</span>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mat khau' }]}
          >
            <Input />
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
