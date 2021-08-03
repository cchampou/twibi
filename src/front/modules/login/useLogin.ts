/* eslint-disable no-console */
import { useHistory, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { extractUrlParams, trimHash } from './login.utils';
import { JWT } from '../storage/storage.constants';
import { postRequest } from '../../utils/http';

const goToDashboard = (history) => history.replace('/dashboard');

const autoLogin = (history) => {
  const token = localStorage.getItem(JWT);
  if (token) {
    console.info('JWT token stored, going to dashboard');
    goToDashboard(history);
  }
};

export const useLogout = () => {
  const history = useHistory();

  return useCallback(() => {
    localStorage.removeItem(JWT);
    history.replace('/');
  }, [history]);
};

const useLogin = () => {
  const [error, setError] = useState(null);
  const { hash } = useLocation();
  const history = useHistory();

  useEffect(() => {
    autoLogin(history);
    const trimmed = trimHash(hash);
    const params = extractUrlParams(trimmed);
    if (params.get('access_token')) {
      postRequest(
        '/twitch/login',
        {
          token: params.get('access_token'),
        },
        {}
      )
        .then((res) => {
          if (res.status !== 200) {
            throw Error('nope');
          }
          return res.text();
        })
        .then((token) => {
          localStorage.setItem(JWT, token);
          goToDashboard(history);
        })
        .catch((e) => {
          console.log(e);
          setError("Vous n'êtes pas invité à l'Early Access");
        });
    }
  }, []);

  return error;
};

export default useLogin;
