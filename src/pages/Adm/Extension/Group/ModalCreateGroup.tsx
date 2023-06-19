import { Form, Input, Modal } from 'antd';
import React from 'react';
import styles from './Group.module.scss';
import CommonButton from 'components/CommonButton/CommonButton';
import {TCreateGroups, } from 'store/slices/type';
import { useForm } from 'antd/es/form/Form';
type Props = {
  open: boolean;
  onCreateGroup: (data: TCreateGroups) => void;
  onCancel: () => void;
};
const ModalCreateGroup = ({ open, onCreateGroup, onCancel }: Props) => {
  const [form] = useForm();
  return (
    <Modal open={open} footer={null} onCancel={onCancel}>
      <div className={styles.wrapperModal}>
        <Form
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(data: TCreateGroups) => {
            onCreateGroup(data);
            form.resetFields();
            onCancel();
          }}
          autoComplete="off"
          form={form}
        >
          <span>Tên đơn vị</span>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui long dien ten khoa phong!' }]}
          >
            <Input />
          </Form.Item>
          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton isSubmit={true}>Tao đơn vị</CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
export default ModalCreateGroup;
