import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Heading from '../components/Heading';
import { generateTwitchOAuthLink } from '../utils/twitch';
import useLogin from '../modules/login/useLogin';
import Picture, { SizeEnum } from '../components/Image';
import down from '../assets/down.svg';
import twitch from '../assets/twitch.png';
import discord from '../assets/discord.png';
import theme from '../theme';

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
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50vh;
  width: 80vw;
  margin: auto;
`;

const ThirdWrapper = styled(SecondWrapper)`
  justify-content: flex-end;
`;

const UnderWrapper = styled('div')`
  padding: 5rem;
`;

const Paragraph = styled('p')`
  line-height: 3rem;
`;

const Footer = styled('footer')`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Chevron = styled(Picture)`
  position: absolute;
  top: 90vh;
`;

const GithubLink = styled('a')`
  text-decoration: none;
  color: ${theme.colors.white};
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
        <Heading level={2}>Twitch & social networks tools</Heading>
        <a href={loginUrl} target="_self">
          <Button type="button">Enter</Button>
        </a>
        {error}
        <Chevron alt="down" src={down} size={SizeEnum.SMALL} />
      </HomeWrapper>
      <SecondWrapper>
        <UnderWrapper>
          <Heading level={2}>Twitch chat notifications</Heading>
          <Paragraph>
            Get informed when a viewer is following, hosting, subscribing, and
            more !
          </Paragraph>
        </UnderWrapper>
        <UnderWrapper>
          <Picture alt="twitch" src={twitch} size={SizeEnum.SMALL} />
        </UnderWrapper>
      </SecondWrapper>
      <ThirdWrapper>
        <UnderWrapper>
          <Picture alt="discord" src={discord} size={SizeEnum.SMALL} />
        </UnderWrapper>
        <UnderWrapper>
          <Heading level={2}>Now live notifications</Heading>
          <Paragraph>
            Inform your fans you are live on your favorite social networks, like
            Discord, Twitter & more.
          </Paragraph>
        </UnderWrapper>
      </ThirdWrapper>
      <Footer>
        <GithubLink
          href="https://www.github.com/cchampou/twibi"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} />
          &nbsp;Github&nbsp;
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </GithubLink>
      </Footer>
    </>
  );
};

export default Home;
