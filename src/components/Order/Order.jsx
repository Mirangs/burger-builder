import React from 'react';
import styled from 'styled-components';
import { Tag, Row, Col, Button, Typography } from 'antd';

import Burger from '../Burger/Burger';

const { Paragraph } = Typography;

const Order = ({ ingredients, totalPrice, date, status }) => {
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <Tag key={ig.name} color="blue">
        {ig.name} ({ig.amount})
      </Tag>
    );
  });

  return (
    <OrderWrapper>
      <Row justify="center" gutter={[10, 10]}>
        <Col lg={14} xs={24}>
          <p>Ingredients: </p>
          <p>{ingredientOutput}</p>
          <p>
            Price: <strong>${totalPrice}</strong>
          </p>
          <p>
            Status: <strong>{status}</strong>
          </p>
        </Col>
        <BurgerWrapper lg={10} xs={24}>
          <Burger ingredients={ingredients} />
        </BurgerWrapper>
        <Col lg={12} xs={24}>
          <OrderButton type="primary">Order again</OrderButton>
        </Col>
        <Col lg={12} xs={24}>
          <OrderDate>Order Date: {date}</OrderDate>
        </Col>
      </Row>
    </OrderWrapper>
  );
};

const OrderWrapper = styled.section`
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  width: 100%;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

const OrderButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const BurgerWrapper = styled(Col)`
  height: 150px;
`;

const OrderDate = styled(Paragraph)`
  margin: 1rem 0 0 0 !important;
  padding-left: 5px;
  line-height: 32px;
`;

export default Order;
