import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import styles from './style.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import useService from './service';
import CommonButton from 'components/CommonButton/CommonButton';

type Props = {};

const Login = (props: Props) => {
  const { handleLogin, handleForgot } = useService();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState<'login' | 'forgot'>('login');
  const [mail, setMail] = useState<string>('');
  return (
    <div className={styles.wrapper}>
      {page === 'login' ? (
        <div className={styles.loginForm}>
          <Form
            name="basic"
            style={{ width: 400 }}
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              label={<span className={styles.label}>Tài khoản</span>}
              name="username"
              colon={false}
              rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span className={styles.label}>Mật khẩu</span>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập nhập mật khẩu!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              className={styles.remember}
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 0, span: 0 }}
            >
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>

            <CommonButton onClick={() => setPage('forgot')}>Quên mật khẩu</CommonButton>

            <CommonButton isSubmit className={styles.submitBtn}>
              <strong>Đăng nhập</strong>
            </CommonButton>
          </Form>
        </div>
      ) : (
        <div className={styles.loginForm} style={{ width: '500px' }}>
          <p style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: '600' }}>
            Quên mật khẩu
          </p>
          <p style={{ marginBottom: '1rem' }}>Nhập email của bạn:</p>
          <Input onChange={(e) => setMail(e.target.value)} value={mail} />
          <div style={{ margin: '2rem 0 ' }}>
            <CommonButton onClick={() => handleForgot(mail)}>Gửi mật khẩu</CommonButton>
          </div>
          <p>
            Bạn có tài khoản? Hãy{' '}
            <span style={{ color: '#1582ca', cursor: 'pointer' }} onClick={() => setPage('login')}>
              đăng nhập
            </span>{' '}
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
