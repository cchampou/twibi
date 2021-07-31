import { useEffect, useState } from 'react';
import { getJsonRequest } from '../../utils/http';
import { TWITCH_ACCESS_TOKEN } from '../storage/storage.constants';

const useProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getJsonRequest('https://api.twitch.tv/helix/users', {
      Authorization: `Bearer ${localStorage.getItem(TWITCH_ACCESS_TOKEN)}`,
      'client-id': process.env.TWITCH_CLIENT_ID
    })
      .then((json) => setData(json.data[0]));
  }, []);

  return data;
};

export default useProfile;
