import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';
import DiscordModule from '../modules/discord/discord';

const Discord = () => (
  <section>
    <Heading level={2}>Discord</Heading>
    <a
      href={`https://discord.com/api/oauth2/authorize?client_id=848550213747474472&redirect_uri=${process.env.PUBLIC_URL}%2Fdashboard&response_type=token&scope=bot`}
    >
      <Button type="button">Connect to Discord</Button>
    </a>
    <DiscordModule />
  </section>
);

export default Discord;
