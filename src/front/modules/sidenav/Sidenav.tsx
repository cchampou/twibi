import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Logo from '../../components/Logo';
import theme from '../../theme';

const SidenavWrapper = styled('div')`
   display: flex;
   flex-direction: column;
   width: 20rem;
   height: 100vh;
   align-items: center;
   z-index: 1;
   box-shadow: 0 0 10px black;
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

const Sidenav = ({ baseUrl }: { baseUrl: string }) => (
  <SidenavWrapper>
    <Logo />
    <SidenavItem to={`${baseUrl}/stats`}>
      Stats 🏗
    </SidenavItem>
    <SidenavItem to={`${baseUrl}/notifications`}>
      Social Notifications
    </SidenavItem>
    <SidenavItem to={`${baseUrl}/bots`}>
      Chatbots  🏗
    </SidenavItem>
    <SidenavItem to={`${baseUrl}/overlays`}>
      Streaming overlays  🏗
    </SidenavItem>
  </SidenavWrapper>
);

export default Sidenav;
