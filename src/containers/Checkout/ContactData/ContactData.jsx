import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import * as R from 'ramda';
import { connect, useSelector } from 'react-redux';
import axios from '../../../axios-order';
import { Form, Input, Select, Typography, Button, message } from 'antd';

import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';

import './ContactData.css';

const { Title } = Typography;
const { Option } = Select;

const ContactData = ({
  ingredients,
  totalPrice,
  onOrderBurger,
  loading,
  purchased,
  token,
  setTotalPrice,
}) => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [initialValues, setInitialValues] = useState([]);
  const [userDataLoading, setUserDataLoading] = useState(false);

  const { id } = useSelector((state) => ({
    id: state.auth.userId,
  }));

  useEffect(() => {
    async function fetchUserInfo() {
      setUserDataLoading(true);
      try {
        const userData = (await fetch(`/api/user/by-id/${id}`)).json();
        const countries = (await fetch('/api/country')).json();

        const res = await Promise.all([userData, countries]);
        const transformedData = {
          ...res[0],
          delivery_method:
            res[0].delivery_method === false ? 'fastest' : 'cheapest',
        };

        setInitialValues(R.omit(['user_role_id', 'password'], transformedData));
        setCountries(res[1]);
      } catch (err) {
        message.error(err);
      } finally {
        setUserDataLoading(false);
      }
    }

    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const orderHandler = (order) => {
    const formData = order;
    const request = {
      ingredients,
      price: totalPrice,
      orderData: formData,
      id,
    };
    onOrderBurger(request);
    setTotalPrice(4);
    message.success(
      'Your order was successfully created! Expect an order soon'
    );
  };

  const resetHandler = () => form.resetFields();

  return (
    <div className="ContactData">
      {loading || userDataLoading ? (
        <Spinner />
      ) : (
        <>
          <Title level={4}>Enter your contact data</Title>
          <Form
            name="order"
            initialValues={initialValues}
            onFinish={orderHandler}
            layout="vertical"
            form={form}
          >
            <Form.Item
              label="Your name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input placeholder="Max" />
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
              label="Your street"
              name="street"
              rules={[{ required: true, message: 'Please enter your street!' }]}
            >
              <Input placeholder="Shevchenka street" />
            </Form.Item>
            <Form.Item
              label="Your Zip Code"
              name="zip_code"
              rules={[
                { required: true, message: 'Please enter your Zip Code!' },
              ]}
            >
              <Input type="number" placeholder="08600" />
            </Form.Item>
            <Form.Item
              label="Your country"
              name="country_id"
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
            <Form.Item
              label="Your email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter correct email!' },
              ]}
            >
              <Input type="email" placeholder="example@mail.com" />
            </Form.Item>
            <Form.Item name="delivery_method" label="Delivery Method">
              <Select>
                <Option value="fastest">Fastest</Option>
                <Option value="cheapest">Cheapest</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <ResetButton htmlType="button" onClick={resetHandler}>
                Reset
              </ResetButton>
              <Button type="primary" htmlType="submit">
                Order
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      {purchased && <Redirect to="/" />}
    </div>
  );
};

const ResetButton = styled(Button)`
  margin-right: 1rem;
`;

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  purchased: state.order.purchased,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
  setTotalPrice: (price) => dispatch(actions.setTotalPrice(price)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
