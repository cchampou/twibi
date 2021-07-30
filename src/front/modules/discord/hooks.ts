import { useCallback, useEffect, useState } from 'react';
import { Channel } from 'discord.js';
import { fetchChannels, submitChannel } from './utils';

const useDiscord = () => {
  const [channels, setChannels]: [Array<Channel>, Function] = useState([]);
  const [channel, setChannel] = useState(null);

  const subscribe: () => void = useCallback(() => {
    submitChannel(channel);
  }, [channel]);

  const onChange = useCallback((e) => setChannel(e.target.value), [channel]);

  useEffect(() => {
    fetchChannels().then((response) => setChannels(response));
  }, []);

  return {
    subscribe,
    channels,
    onChange,
  };
};

export default useDiscord;
