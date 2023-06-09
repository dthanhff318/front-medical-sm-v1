import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import { TCreateUser } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
type Props = {
  open: boolean;
  onCreateUser: (data: TCreateUser) => void;
  onCancel: () => void;
  loading: 'department' | 'user' | '';
};

const ModalCreateUser = ({ open, onCreateUser, onCancel, loading }: Props) => {
  const [form] = useForm();
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(data) => {
            onCreateUser(data);
            form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <span>Ten hien thi</span>
          <Form.Item
            name="displayName"
            rules={[{ required: true, message: 'Please input your displayname!' }]}
          >
            <Input />
          </Form.Item>
          <span>Email</span>
          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Vui lòng nhập đúng email' }]}
          >
            <Input />
          </Form.Item>

          <span>Tai khoan</span>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <span>Mat khau</span>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <span>Nhap lai mat khau</span>
          <Form.Item
            name=""
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton loading={loading === 'user'} isSubmit={true}>
                Tao tai khoan
              </CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateUser;
