import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { generateTwitchOAuthLink } from '../utils/twitch';
import useLogin from '../modules/login/useLogin';
import Picture, { SizeEnum } from '../components/Image';
import down from '../assets/down.svg';
import twitch from '../assets/twitch.png';
import discord from '../assets/discord.png';

const HomeWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const SecondWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100vw;
`;

const Chevron = styled(Picture)`
  position: absolute;
  top: 90vh;
`;

const Home = () => {
  const error = useLogin();
  const loginUrl = useMemo(
    () => generateTwitchOAuthLink(process.env.TWITCH_CLIENT_ID),
    []
  );

  return (
    <>
      <HomeWrapper>
        <Logo />
        <Heading level={1}>Twibi</Heading>
        <Heading level={2}>Twitch & Discord tools</Heading>
        <a href={loginUrl} target="_self">
          <Button type="button">Enter</Button>
        </a>
        {error}
        <Chevron alt="down" src={down} size={SizeEnum.SMALL} />
      </HomeWrapper>
      <SecondWrapper>
        <Heading level={2}>Twitch chat notifications</Heading>
        <p>
          Get informed when a viewer is follow, hosting, subscribing, and more !
        </p>
        <Picture alt="twitch" src={twitch} size={SizeEnum.SMALL} />
      </SecondWrapper>
      <SecondWrapper>
        <Heading level={2}>Now live notifications</Heading>
        <p>
          Inform your fans you are live on your favorite social networks, like
          Discord, Twitter & more.
        </p>
        <Picture alt="discord" src={discord} size={SizeEnum.SMALL} />
      </SecondWrapper>
    </>
  );
};

export default Home;
