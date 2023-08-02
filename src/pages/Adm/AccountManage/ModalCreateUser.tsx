import { Button, Checkbox, Form, Input, Modal, Row, Select } from 'antd';
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
          <span>Tên người dùng</span>
          <Form.Item name="displayName" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input />
          </Form.Item>
          <span>Email</span>
          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Vui lòng nhập đúng email' }]}
          >
            <Input />
          </Form.Item>

          <span>Tài khoản</span>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input />
          </Form.Item>

          <span>Mật khẩu</span>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password />
          </Form.Item>

          <span>Nhập lại mật khẩu</span>
          <Form.Item
            name=""
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <strong>Chức năng</strong>
          <Form.Item
            name="permission"
            rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}
          >
            <Checkbox.Group style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Row>
                <Checkbox value="department-add">Nhập kho</Checkbox>
              </Row>
              <Row>
                <Checkbox value="department-refund">Tổng kho</Checkbox>
              </Row>
              <Row>
                <Checkbox value="department-report">Báo cáo</Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton loading={loading === 'user'} isSubmit={true}>
                Tạo tài khoản
              </CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateUser;
