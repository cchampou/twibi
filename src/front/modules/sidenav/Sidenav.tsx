import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { useLogout } from '../login/useLogin';

const SidenavWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 100vh;
  align-items: center;
  z-index: 1;
  box-shadow: 0 0 10px black;
  background-color: black;
`;

const SidenavItem = styled(Link)`
  font-family: Helvetica, sans-serif;
  color: ${theme.colors.white};
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: lighter;
`;

const Sidenav = ({ baseUrl }: { baseUrl: string }) => {
  const logout = useLogout();

  return (
    <SidenavWrapper>
      <Logo />
      {/* <SidenavItem to={`${baseUrl}/notifications`}> */}
      {/*  Social Notifications */}
      {/* </SidenavItem> */}
      <SidenavItem to={`${baseUrl}/bots`}>
        Chatbots&nbsp;
        <FontAwesomeIcon icon={faCommentDots} />
      </SidenavItem>
      {/* <SidenavItem to={`${baseUrl}/settings`}>Settings ⚙️</SidenavItem> */}
      <SidenavItem to="/" onClick={logout}>
        Logout&nbsp;
        <FontAwesomeIcon icon={faSignOutAlt} />
      </SidenavItem>
    </SidenavWrapper>
  );
};

export default Sidenav;
