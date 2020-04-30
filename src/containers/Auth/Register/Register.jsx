import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as R from 'ramda';
import styled from 'styled-components';
import { Form, Input, Button, Select, Row, Col, message, Spin } from 'antd';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { register } from '../../../store/actions/auth';

const Register = () => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const { err, loading } = useSelector((state) => ({
    err: state.auth.err,
    loading: state.auth.loading,
  }));

  useEffect(() => {
    if (err) {
      message.error(err);
    }
  }, [err]);

  useEffect(() => {
    async function fetchData() {
      setDataLoading(true);
      try {
        const countries = axios.get('/api/country');
        const roles = axios.get('/api/user/roles');
        const res = await Promise.all([countries, roles]);
        setCountries(res[0].data);
        setRoles(res[1].data);
      } catch (err) {
        message.error('Loading error');
      } finally {
        setDataLoading(false);
      }
    }

    fetchData();
  }, []);

  const submitHandler = (values) => {
    dispatch(register(R.omit(['confirm'], values)));
    history.push('/login');
  };

  const resetHandler = () => form.resetFields();

  return (
    <Row>
      <Col span={6} offset={8}>
        {loading || dataLoading ? (
          <Spinner />
        ) : (
          <Form
            name="register"
            layout="vertical"
            onFinish={submitHandler}
            initialValues={{
              deliveryMethod: 'fastest',
              country: 229,
              role: roles.length !== 0 ? roles[0].id : 1,
            }}
            form={form}
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
              hasFeedback
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 5,
                  message: 'Password must be minimum 5 characters long!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Minimum 5 characters long" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      'Two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Minimum 5 characters long" />
            </Form.Item>

            <Form.Item label="Delivery Method" name="deliveryMethod">
              <Select>
                <Select.Option value="fastest">Fastest</Select.Option>
                <Select.Option value="cheapest">Cheapest</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Your Contact Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please enter your Contact Phone!' },
              ]}
            >
              <Input type="number" placeholder="+380993650325" />
            </Form.Item>

            <Form.Item
              label="Street"
              name="street"
              rules={[
                {
                  required: true,
                  message: 'Please input your street!',
                },
              ]}
            >
              <Input placeholder="Street" />
            </Form.Item>

            <Form.Item
              label="Your Zip Code"
              name="zipCode"
              rules={[
                { required: true, message: 'Please enter your Zip Code!' },
              ]}
            >
              <Input type="number" placeholder="08600" />
            </Form.Item>

            <Form.Item
              label="Your country"
              name="country"
              rules={[
                { required: true, message: 'Please enter your country!' },
              ]}
            >
              <Select
                showSearch
                placeholder="Enter country"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {countries.map((country) => (
                  <Select.Option
                    value={country.id}
                    key={country.id}
                  >{`${country.name} (${country.code})`}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Role" name="role">
              <Select>
                {roles.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Row justify="center">
                <Col span={24}>
                  <RegisterButton type="primary" htmlType="submit">
                    Register
                  </RegisterButton>
                  <ResetButton htmlType="button" onClick={resetHandler}>
                    Reset
                  </ResetButton>
                  <LoginLink type="link" onClick={() => history.push('/login')}>
                    Login
                  </LoginLink>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        )}
      </Col>
    </Row>
  );
};

const LoginLink = styled(Button)`
  display: block;
  width: 100%;
  margin-top: 1rem;
`;

const Spinner = styled(Spin)`
  width: 100%;
`;

const RegisterButton = styled(Button)`
  width: 45%;
`;

const ResetButton = styled(Button)`
  width: 45%;
  margin-left: 10%;
`;

export default Register;
