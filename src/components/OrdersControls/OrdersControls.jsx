import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Row, Col, Form, Checkbox, Select } from 'antd';

const OrdersControls = ({ filter, onFilterChange }) => {
  const { ingredients } = useSelector((state) => ({
    ingredients: state.burgerBuilder.ingredients,
  }));

  return (
    <OrdersControlsWrapper align="middle" justify="center">
      <Col span={10}>
        <Form
          onValuesChange={(_, values) => onFilterChange(values)}
          initialValues={filter}
          layout="horizontal"
        >
          <Form.Item name="ingredients" label="Ingredients">
            <Checkbox.Group>
              {ingredients.map(({ id, name }) => (
                <Checkbox key={id} value={name}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item name="order" label="Order By">
            <Select>
              <Select.Option value="asc">Price Ascending</Select.Option>
              <Select.Option value="desc">Price Descending</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Col>
    </OrdersControlsWrapper>
  );
};

const OrdersControlsWrapper = styled(Row)`
  padding: 30px;
`;

export default OrdersControls;
