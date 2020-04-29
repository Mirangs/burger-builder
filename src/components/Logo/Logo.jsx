import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css';

const Logo = () => {
  const history = useHistory();

  return (
    <StyledLogo onClick={() => history.push('/')}>
      <img src={burgerLogo} alt="Burger Builder Logo" />
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  height: 100%;
  width: 80px;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;

  img {
    width: 100%;
  }
`;

export default Logo;
