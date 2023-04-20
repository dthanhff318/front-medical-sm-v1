import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
type Props = {
  open: boolean;
  onCreateUser: () => void;
  onCancel: () => void;
};

const ModalCreateUser = ({ open, onCreateUser, onCancel }: Props) => {
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={() => {}}
          autoComplete="off"
        >
          <span>Ten hien thi</span>
          <Form.Item
            name="displayname"
            rules={[{ required: true, message: 'Please input your displayname!' }]}
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
            name="confirm"
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

          <span>Lua chon khoa phong</span>
          <Form.Item
            name="department"
            rules={[{ required: true, message: 'Hay lua chon khoa phong' }]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="logi">logi</Select.Option>
              <Select.Option value="cog">cog</Select.Option>
            </Select>
          </Form.Item>
          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton onClick={onCreateUser} isSubmit={true}>
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
