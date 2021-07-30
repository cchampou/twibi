import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { generateTwitchOAuthLink } from '../utils/twitch';
import useLogin from '../modules/login/useLogin';

const HomeWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Home = () => {
  useLogin();
  const loginUrl = useMemo(
    () => generateTwitchOAuthLink(process.env.TWITCH_CLIENT_ID),
    []
  );

  return (
    <HomeWrapper>
      <Logo />
      <Heading level={1}>Twibi</Heading>
      <Heading level={2}>Twitch & Discord tools</Heading>
      <a href={loginUrl} target="_self">
        <Button type="button">Enter</Button>
      </a>
    </HomeWrapper>
  );
};

export default Home;
