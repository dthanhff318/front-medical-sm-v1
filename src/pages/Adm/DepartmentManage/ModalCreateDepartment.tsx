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

const ModalCreateDepartment = ({ open, onCreateDepartment, onCancel }: Props) => {
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
          <span>Tên khoa phòng</span>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Vui long điền tên khoa phòng!' }]}
          >
            <Input />
          </Form.Item>

          <span>Ví trí</span>
          <Form.Item
            name="location"
            rules={[{ required: true, message: 'Hãy nhập vị trí khoa phòng!' }]}
          >
            <Input />
          </Form.Item>

          <span>Số điện thoại</span>
          <Form.Item name="phone" rules={[{ required: true, message: 'Hãy nhập số điện thọai' }]}>
            <Input />
          </Form.Item>

          <div className={styles.bottom}>
            <Form.Item>
              <CommonButton isSubmit={true}>Thêm khoa phòng</CommonButton>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCreateDepartment;
