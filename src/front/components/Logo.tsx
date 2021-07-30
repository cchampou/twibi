import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import logo from '../assets/logo.svg';
import { TWITCH_ACCESS_TOKEN } from '../modules/storage/storage.constants';

const StyledLogo = styled('img')`
  width: 10rem;
  height: 10rem;
  cursor: pointer;
`;

const Logo = () => {
  const history = useHistory();
  const isAuth = useMemo(
    () => Boolean(localStorage.getItem(TWITCH_ACCESS_TOKEN)),
    []
  );

  const onClickHandler = useCallback(() => {
    history.push(isAuth ? '/dashboard' : '/');
  }, [history, isAuth]);

  return <StyledLogo src={logo} alt="Twibi logo" onClick={onClickHandler} />;
};

export default Logo;
