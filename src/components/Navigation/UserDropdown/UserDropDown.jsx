import React from 'react';
import { Menu, Dropdown, Button, Typography } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { decode } from 'jsonwebtoken';

import { logout } from '../../../store/actions/auth';
import styled from 'styled-components';

const { Text } = Typography;

const menu = (onLogout) => (
  <BrownMenu>
    <Menu.Item key="0">
      <WhiteColorButton type="link" onClick={onLogout}>
        Logout
      </WhiteColorButton>
    </Menu.Item>
  </BrownMenu>
);

const UserDropDown = () => {
  const dispatch = useDispatch();
  const { idToken } = useSelector((state) => ({
    idToken: state.auth.token,
  }));
  let email = '';
  if (idToken) {
    email = decode(idToken).email;
  }

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Dropdown overlay={() => menu(onLogout)} trigger={['hover']}>
      <UserName>
        {email} <DownOutlined />
      </UserName>
    </Dropdown>
  );
};

const UserName = styled(Text)`
  color: #fff;
  cursor: pointer;
`;

const BrownMenu = styled(Menu)`
  background-color: #703b09;

  .ant-dropdown-menu-item:hover {
    color: #cf8f2e;
  }
`;

const WhiteColorButton = styled(Button)`
  color: #fff;
  width: 100%;

  &:hover {
    color: #cf8f2e;
  }
`;

export default UserDropDown;
