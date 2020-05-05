import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox, Row, Col, message, Spin } from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../../store/actions/auth';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { err, loading } = useSelector((state) => ({
    err: state.auth.err,
    loading: state.auth.loading,
  }));

  useEffect(() => {
    if (err) {
      return message.error(err);
    }

    if (err && err.name) {
      return message.error('Something went wrong... Please try again later');
    }
  }, [err]);

  const submitHandler = (values) => {
    dispatch(login(values.email, values.password));
    history.push('/');
  };

  return (
    <LoginRow align="center" justify="center">
      <Col span={24} lg={6}>
        {loading ? (
          <Spinner />
        ) : (
          <Form
            name="login"
            layout="vertical"
            onFinish={submitHandler}
            style={{ width: '100%' }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'Please enter correct email!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Row justify="center">
                <Col span={24}>
                  <LoginButton type="primary" htmlType="submit">
                    Login
                  </LoginButton>
                  <RegisterLink
                    type="link"
                    onClick={() => history.push('/register')}
                  >
                    Register
                  </RegisterLink>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
      </Col>
    </LoginRow>
  );
};

const RegisterLink = styled(Button)`
  display: block;
  width: 100%;
  margin-top: 1rem;
`;

const Spinner = styled(Spin)`
  width: 100%;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

const LoginRow = styled(Row)`
  padding: 20px;
`;

export default Login;
