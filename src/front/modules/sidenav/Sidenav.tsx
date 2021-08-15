import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { faCommentDots, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';
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
  box-shadow: 0 0 10px ${theme.colors.black};
  background-color: ${theme.colors.black};

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: auto;
    width: 100vw;
  }
`;

interface SidenavIteType {
  disabled?: boolean;
}

const SidenavItem = styled(Link)<SidenavIteType>`
  font-family: Helvetica, sans-serif;
  color: ${({ disabled }) =>
    disabled ? theme.colors.gray : theme.colors.white};
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
      <SidenavItem to={`${baseUrl}/discord`} disabled>
        Discord&nbsp;
        <FontAwesomeIcon icon={faDiscord} />
      </SidenavItem>
      <SidenavItem to="#" disabled>
        Twitter&nbsp;
        <FontAwesomeIcon icon={faTwitter} />
      </SidenavItem>
      {/* <SidenavItem to={`${baseUrl}/settings`}>Discord ⚙️</SidenavItem> */}
      <SidenavItem to="/" onClick={logout}>
        Logout&nbsp;
        <FontAwesomeIcon icon={faSignOutAlt} />
      </SidenavItem>
    </SidenavWrapper>
  );
};

export default Sidenav;
