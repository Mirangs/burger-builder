import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Select, Typography, Button, message } from 'antd';

import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/';
import { useRequest } from '../../../hooks';

const { Title } = Typography;
const { Option } = Select;

const ContactData = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState([]);

  const { id, ingredients, totalPrice, purchaseLoading } = useSelector(
    (state) => ({
      id: state.auth.userId,
      ingredients: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      purchaseLoading: state.order.loading,
    })
  );
  const dispatch = useDispatch();

  const { data: user, loading: userLoading, error: userError } = useRequest(
    `/api/user/by-id/${id}`
  );
  const {
    data: countries,
    loading: countriesLoading,
    error: countriesError,
  } = useRequest(`/api/country`);
  const loading = countriesLoading || userLoading;

  useEffect(() => {
    if (user) {
      const transformedData = {
        ...user,
        delivery_method:
          user.delivery_method === false ? 'fastest' : 'cheapest',
      };
      setInitialValues(R.omit(['user_role_id', 'password'], transformedData));
    }
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (countriesError) {
    message.error('Failed to fetch countries');
    return <p>Failed to fetch countries</p>;
  }
  if (userError) {
    message.error('Failed to fetch user data');
    return <p>Failed to fetch user data</p>;
  }

  const orderHandler = (order) => {
    const formData = order;
    const request = {
      ingredients,
      price: totalPrice,
      orderData: formData,
      id,
    };

    dispatch(actions.purchaseBurger(request));
    dispatch(actions.setTotalPrice(4));
    message.success(
      'Your order was successfully created! Expect an order soon'
    );
    dispatch(actions.initIngredients());
    setTimeout(() => {
      history.push('/');
    }, 500);
  };

  const resetHandler = () => form.resetFields();

  return (
    <ContactDataWrapper>
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
          rules={[{ required: true, message: 'Please enter your Zip Code!' }]}
        >
          <Input type="number" placeholder="08600" />
        </Form.Item>
        <Form.Item
          label="Your country"
          name="country_id"
          rules={[{ required: true, message: 'Please enter your country!' }]}
        >
          <Select
            showSearch
            placeholder="Enter country"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <Button type="primary" htmlType="submit" loading={purchaseLoading}>
            Order
          </Button>
        </Form.Item>
      </Form>
    </ContactDataWrapper>
  );
};

const ContactDataWrapper = styled.section`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;

  .Input {
    display: block;
  }

  @media (min-width: 600px) {
    width: 500px;
  }
`;

const ResetButton = styled(Button)`
  margin-right: 1rem;
`;

export default ContactData;
