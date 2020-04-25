import React from 'react';
import styled from 'styled-components';
import { Button, Typography, Modal } from 'antd';

import Burger from '../../Burger/Burger';

const { Title } = Typography;

const CheckoutSummary = ({
  ingredients,
  onCheckoutCancelled,
  onCheckoutContinued,
  visible,
}) => {
  return (
    <CheckoutModal
      visible={visible}
      centered
      onCancel={onCheckoutCancelled}
      footer={[
        <Button onClick={onCheckoutCancelled}>Cancel</Button>,
        <Button type="primary" onClick={onCheckoutContinued}>
          Continue
        </Button>,
      ]}
    >
      <ChecoutTitle level={3}>We hope it tastes well!</ChecoutTitle>
      <Burger ingredients={ingredients} />
    </CheckoutModal>
  );
};

const CheckoutModal = styled(Modal)`
  min-width: 60vw;
`;

const ChecoutTitle = styled(Title)`
  text-align: center;
  margin-bottom: 2rem;
`;

export default CheckoutSummary;
