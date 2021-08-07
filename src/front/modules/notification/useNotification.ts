import { useCallback, useEffect, useState } from 'react';
import { deleteRequest, getJsonRequest, postRequest } from '../../utils/http';
import { JWT } from '../storage/storage.constants';

const useNotification = (type, defaultText) => {
  const [notified, setNotified] = useState(null);
  const [text, setText] = useState(defaultText);

  const changeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  useEffect(() => {
    getJsonRequest(`/twitch/subscribe/${type}`, {
      Authorization: `Bearer ${localStorage.getItem(JWT)}`,
    }).then((res) => {
      if (res) {
        setText(res.text);
        setNotified(true);
      }
    });
  }, []);

  const addNotification = useCallback(
    (e) => {
      e.preventDefault();
      postRequest(
        `/twitch/subscribe/${type}`,
        {
          text,
        },
        {
          Authorization: `Bearer ${localStorage.getItem(JWT)}`,
        }
      ).then(() => setNotified(true));
    },
    [text]
  );

  const deleteHostNotification = useCallback(() => {
    deleteRequest(`/twitch/subscribe/${type}`, {
      Authorization: `Bearer ${localStorage.getItem(JWT)}`,
    }).then(() => setNotified(false));
  }, []);

  return {
    notify: Boolean(notified),
    deleteNotification: deleteHostNotification,
    addNotification,
    text,
    changeText,
  };
};

export default useNotification;
