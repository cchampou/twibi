/* eslint-disable no-console */
import { useHistory, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { extractUrlParams, trimHash } from './login.utils';
import { TWITCH_ACCESS_TOKEN } from '../storage/storage.constants';

const goToDashboard = (history) => history.replace('/dashboard');

const autoLogin = (history) => {
  const token = localStorage.getItem(TWITCH_ACCESS_TOKEN);
  if (token) {
    console.info('twitch token stored, going to dashboard');
    goToDashboard(history);
  }
};

export const useLogout = () => {
  const history = useHistory();

  return useCallback(() => {
    localStorage.removeItem(TWITCH_ACCESS_TOKEN);
    history.replace('/');
  }, [history]);
};

const useLogin = () => {
  const { hash } = useLocation();
  const history = useHistory();
  useEffect(() => {
    autoLogin(history);
    const trimmed = trimHash(hash);
    const params = extractUrlParams(trimmed);
    if (params.get('access_token')) {
      localStorage.setItem(TWITCH_ACCESS_TOKEN, params.get('access_token'));
      console.info('twitch token stored, going to dashboard');
      goToDashboard(history);
    }
  }, []);
};

export default useLogin;
