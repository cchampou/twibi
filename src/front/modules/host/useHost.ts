import { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getJsonRequest, postRequest } from '../../utils/http';
import { JWT } from '../storage/storage.constants';

const useHost = () => {
  const [host, setHost] = useState(null);
  useEffect(() => {
    getJsonRequest('/twitch/subscribe/host', {
      Authorization: `Bearer ${localStorage.getItem(JWT)}`,
    }).then((res) => {
      setHost(res);
    });
  }, []);

  const addHostNotification = useCallback(() => {
    postRequest(
      '/twitch/subscribe/host',
      {},
      {
        Authorization: `Bearer ${localStorage.getItem(JWT)}`,
      }
    ).then(() => setHost(true));
  }, []);
  const deleteHostNotification = useCallback(() => {
    deleteRequest('/twitch/subscribe/host', {
      Authorization: `Bearer ${localStorage.getItem(JWT)}`,
    }).then(() => setHost(false));
  }, []);

  return {
    host: Boolean(host),
    deleteHostNotification,
    addHostNotification,
  };
};

export default useHost;
