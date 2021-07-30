import React from 'react';
import useDiscord from './hooks';
import Heading from '../../components/Heading';
import Button from '../../components/Button';

const Discord = () => {
  const { subscribe, channels, onChange } = useDiscord();

  return (
    <section>
      <Heading level={2}>Discord Live Notifications</Heading>
      <label htmlFor="discord-channel">
        Select Channel
        <select id="discord-channel" onChange={onChange}>
          <option>Pick a channel</option>
          {channels.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <Button type="button" onClick={subscribe}>
        Enable
      </Button>
    </section>
  );
};

export default Discord;
