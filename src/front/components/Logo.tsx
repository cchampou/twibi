import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import logo from '../assets/logo.svg';
import { JWT } from '../modules/storage/storage.constants';
import Picture, { SizeEnum } from './Image';

const Logo = () => {
  const history = useHistory();
  const isAuth = useMemo(() => Boolean(localStorage.getItem(JWT)), []);

  const onClickHandler = useCallback(() => {
    history.push(isAuth ? '/dashboard' : '/');
  }, [history, isAuth]);

  return (
    <Picture
      src={logo}
      alt="Twibi logo"
      onClick={onClickHandler}
      size={SizeEnum.MEDIUM}
    />
  );
};

export default Logo;
