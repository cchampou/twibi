import React, { FunctionComponent } from 'react';
import useDiscord from './discord/hooks';
import { Channel } from '../common/types';

const Discord: FunctionComponent<void> = () => {
  const { subscribe, channels, onChange } = useDiscord();

  return (
    <section>
      <h2>Discord Live Notifications</h2>
      <label htmlFor="discord-channel">
        Select Channel
        <select id="discord-channel" onChange={onChange}>
          <option>Pick a channel</option>
          {channels.map(
            (channel: Channel) => (
              <option key={channel.id} value={channel.id}>
                {channel.name}
              </option>
            ),
          )}
        </select>
      </label>
      <button type="button" onClick={subscribe}>Enable</button>
    </section>
  );
};

export default Discord;
