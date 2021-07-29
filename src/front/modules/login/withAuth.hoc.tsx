import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TWITCH_ACCESS_TOKEN } from '../storage/storage.constants';

const useAuth = () => {
  const history = useHistory();
  useEffect(() => {
    const twitchToken = localStorage.getItem(TWITCH_ACCESS_TOKEN);
    if (!twitchToken) {
      history.replace('/');
    }
  }, []);
};

const withAuthHoc = (Component) => (props) => {
  console.info('checking authentication');
  useAuth();

  return <Component {...props} />;
};

export default withAuthHoc;
