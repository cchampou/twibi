import { Channel } from 'discord.js';
import { getJsonRequest, postRequest } from '../../utils/http';

const submitChannel: (channel: string) => void = (channel) => {
  postRequest('/twitch/event', {
    channel,
  }).then(() => null);
};

const fetchChannels: () => Promise<Array<Channel>> = async () =>
  new Promise((resolve, reject) => {
    getJsonRequest('/discord/channel')
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });

export { submitChannel, fetchChannels };
