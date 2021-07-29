import React from 'react';
import Heading from '../components/Heading';
import Button from '../components/Button';

const Settings = () => (
  <section>
    <Heading level={2}>Settings</Heading>
    <a href="https://discord.com/api/oauth2/authorize?client_id=848550213747474472&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fdashboard&response_type=token&scope=identify">
      <Button type="button">Connect to Discord</Button>
    </a>
  </section>
);

export default Settings;
