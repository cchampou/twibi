import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { JWT } from '../storage/storage.constants';

const useAuth = () => {
  const history = useHistory();
  useEffect(() => {
    const twitchToken = localStorage.getItem(JWT);
    if (!twitchToken) {
      history.replace('/');
    }
  }, []);
};

const withAuthHoc = (Component) => (props) => {
  // eslint-disable-next-line no-console
  console.info('checking authentication');
  useAuth();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

export default withAuthHoc;
