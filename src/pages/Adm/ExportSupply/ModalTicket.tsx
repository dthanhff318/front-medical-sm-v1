import { Form, Input, Modal } from 'antd';
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

const ModalTicket = ({ open, onCreateDepartment, onCancel }: Props) => {
  const [form] = useForm();
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(data: TCreateDepartments) => {
            onCreateDepartment(data);
            form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <span>Ten khoa phong</span>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
          >
            <Input />
          </Form.Item>

          <span>Vi tri</span>
          <Form.Item
            name="location"
            rules={[{ required: true, message: 'Hay nhap vi tri khoa phong!' }]}
          >
            <Input />
          </Form.Item>

          <span>So dien thoai</span>
          <Form.Item name="phone" rules={[{ required: true, message: 'Hay nhap so dien thoai' }]}>
            <Input />
          </Form.Item>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton isSubmit={true}>Tao khoa phong</CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalTicket;
