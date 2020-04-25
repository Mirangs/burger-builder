import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../../axios-order';
import { Form, Input, Select, Typography, Button } from 'antd';

import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';

import './ContactData.css';

const { Title } = Typography;
const { Option } = Select;

const orderFormInitialValues = {
  name: '',
  street: '',
  zipCode: '',
  country: '',
  email: '',
  deliveryMethod: 'fastest',
};

const ContactData = ({
  ingredients,
  totalPrice,
  onOrderBurger,
  loading,
  purchased,
  token,
}) => {
  const [form] = Form.useForm();

  const orderHandler = (order) => {
    const formData = order;
    for (let formElementIdentifier in order) {
      formData[formElementIdentifier] = order[formElementIdentifier].value;
    }
    const request = {
      ingredients,
      price: totalPrice,
      orderData: formData,
    };
    onOrderBurger(request, token);
  };

  const resetHandler = () => form.resetFields();

  return (
    <div className="ContactData">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Title level={4}>Enter your contact data</Title>
          <Form
            name="order"
            initialValues={orderFormInitialValues}
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
              label="Your street"
              name="street"
              rules={[{ required: true, message: 'Please enter your street!' }]}
            >
              <Input placeholder="Shevchenka street" />
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
              <Input placeholder="Ukraine" />
            </Form.Item>
            <Form.Item
              label="Your email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input type="email" placeholder="Ukraine" />
            </Form.Item>
            <Form.Item name="deliveryMethod" label="Delivery Method">
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
