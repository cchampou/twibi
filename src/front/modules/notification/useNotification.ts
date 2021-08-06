import { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getJsonRequest, postRequest } from '../../utils/http';
import { JWT } from '../storage/storage.constants';

const useNotification = (type) => {
  const [notified, setNotified] = useState(null);
  useEffect(() => {
    getJsonRequest(`/twitch/subscribe/${type}`, {
      Authorization: `Bearer ${localStorage.getItem(JWT)}`,
    }).then((res) => {
      setNotified(res);
    });
  }, []);

  const addHostNotification = useCallback(() => {
    postRequest(
      `/twitch/subscribe/${type}`,
      {},
      {
        Authorization: `Bearer ${localStorage.getItem(JWT)}`,
      }
    ).then(() => setNotified(true));
  }, []);
  const deleteHostNotification = useCallback(() => {
    deleteRequest(`/twitch/subscribe/${type}`, {
      Authorization: `Bearer ${localStorage.getItem(JWT)}`,
    }).then(() => setNotified(false));
  }, []);

  return {
    notify: Boolean(notified),
    deleteNotification: deleteHostNotification,
    addNotification: addHostNotification,
  };
};

export default useNotification;
