import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styles from './style.module.scss';

type Props = {};

const Login = (props: Props) => {
  const onFinish = () => {};
  return (
    <div className={styles.wrapper}>
      <div className={styles.loginForm}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={<span className={styles.label}>Username</span>}
            name="username"
            colon={false}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className={styles.label}>Password</span>}
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

          <Button type="primary" htmlType="submit" className={styles.submitBtn}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
