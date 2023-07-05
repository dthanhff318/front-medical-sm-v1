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
          <span>Ten nhan vien</span>
          <Form.Item
            name="displayName"
            rules={[{ required: true, message: 'Vui long nhap ten nhan vien!' }]}
          >
            <Input />
          </Form.Item>

          <span>Chuc vu</span>
          <Form.Item name="role" rules={[{ required: true, message: 'Vui long chon chuc vu!' }]}>
            <Radio.Group>
              <Radio value="staff-accept">Nhan vien quan ly vat tu</Radio>
              <Radio value="staff-report">Nhan vien quan ly bao cao</Radio>
            </Radio.Group>
          </Form.Item>

          <span>Email</span>
          <Form.Item name="email" rules={[{ required: true, message: 'Vui long nhap email' }]}>
            <Input />
          </Form.Item>

          <span>Tai khoan</span>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui long nhap tai khoan' }]}
          >
            <Input />
          </Form.Item>

          <span>Mat khau</span>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui long nhap mat khau' }]}
          >
            <Input />
          </Form.Item>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton isSubmit={true}>Tao nhan vien</CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateStaff;
