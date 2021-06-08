import fetch from 'node-fetch';
import { Channel } from 'discord.js';

const submitChannel: (channel: string) => void = (channel) => {
  fetch('/twitch/event', {
    method: 'POST',
    body: JSON.stringify({
      channel,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};

const fetchChannels: () => Promise<Array<Channel>> = async () => new Promise((resolve, reject) => {
  fetch('/discord/channel')
    .then((res) => res.json())
    .then((json) => resolve(json))
    .catch((err) => reject(err));
});

export {
  submitChannel,
  fetchChannels,
};
