import React from 'react';
import styled from 'styled-components';
import { Tag, Row, Col, Button } from 'antd';

import Burger from '../Burger/Burger';

const Order = ({ ingredients, totalPrice }) => {
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
        </Col>
        <BurgerWrapper lg={10} xs={24}>
          <Burger ingredients={ingredients} />
        </BurgerWrapper>
        <Col lg={12} xs={24}>
          <OrderButton type="primary">Order again</OrderButton>
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

export default Order;
