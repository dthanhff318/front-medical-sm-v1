import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useService from './service';
import CommonButton from 'components/CommonButton/CommonButton';

type Props = {};

const Login = (props: Props) => {
  const { handleLogin } = useService();
  const { loading } = useSelector((state: RootState) => state.auth);

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginForm}>
        <Form
          name="basic"
          style={{ width: 400 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Form.Item
            label={<span className={styles.label}>Tai khoan</span>}
            name="username"
            colon={false}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className={styles.label}>Mat khau</span>}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            className={styles.remember}
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 0, span: 0 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <CommonButton isSubmit className={styles.submitBtn}>
            Login
          </CommonButton>
        </Form>
      </div>
    </div>
  );
};

export default Login;
