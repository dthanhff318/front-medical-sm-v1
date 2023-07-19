import { CameraOutlined } from '@ant-design/icons';
import { Descriptions, Form, Input, Modal } from 'antd';
import uploadApi from 'axiosConfig/api/upload';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import './DefaultLayout.scss';
import { saveUser } from 'store/slices/authSlice';
import { getRoleName } from 'helpers/functions';

type Props = {
  open: boolean;
  handleCancel: () => void;
};

const DEFAULT_AVT =
  'https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg';

const ModalChangePassword = ({ handleCancel, open }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.auth);

  return (
    <Modal title="" open={open} onCancel={handleCancel} width="40vw">
      <div className="change-pass-wrapper">
        <Form>
          <Form.Item
            name="old"
            label="Mật khẩu cũ"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền trường này !',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="new"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: 'Vui lòng điền trường này !',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Nhập lại mật khẩu"
            dependencies={['new']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Vui lòng điền trường này !',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu nhập lại không giống'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalChangePassword;
