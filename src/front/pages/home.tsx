import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Heading from '../components/Heading';

const HomeWrapper = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
   width: 100vw;
`;

const Home = () => (
  <HomeWrapper>
    <Logo />
    <Heading level={1}>Twibi</Heading>
    <Heading level={2}>Twitch & Discord tools</Heading>
    <Link to="/dashboard">
      <Button type="button">Enter</Button>
    </Link>
  </HomeWrapper>
);

export default Home;
