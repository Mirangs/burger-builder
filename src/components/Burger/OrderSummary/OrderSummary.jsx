import React from 'react';
import styled from 'styled-components';
import { Modal, Table, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Column } = Table;

const OrderSummary = ({
  ingredients,
  purchaseCancelled,
  purchaseContinued,
  totalPrice,
  visible,
}) => {
  const ingredientSummary = Object.keys(ingredients).map((igKey) => ({
    ingredient: igKey,
    amount: ingredients[igKey],
    key: igKey,
  }));

  return (
    <Modal
      visible={visible}
      onCancel={purchaseCancelled}
      onOk={purchaseContinued}
    >
      <Title level={3}>Your order:</Title>
      <Paragraph>A delicious burger with the following ingredients:</Paragraph>
      <Table dataSource={ingredientSummary} size="small" pagination={false}>
        <Column title="Ingredient" dataIndex="ingredient" key="ingredient" />
        <Column title="Amount" dataIndex="amount" key="amount" />
      </Table>
      <SummaryParagraph strong>Total Price: {totalPrice}$</SummaryParagraph>
      <Paragraph>Continue to Checkout?</Paragraph>
    </Modal>
  );
};

const SummaryParagraph = styled(Paragraph)`
  margin-top: 1.5rem;
`;

export default OrderSummary;
