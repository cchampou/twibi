import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import * as React from 'react';
import { useCallback } from 'react';
import logo from '../assets/logo.svg';

const StyledLogo = styled('img')`
  width: 10rem;
  height: 10rem;
  cursor: pointer;
`;

const Logo = () => {
  const history = useHistory();

  const onClickHandler = useCallback(() => {
    history.push('/');
  }, [history]);

  return <StyledLogo src={logo} alt="Twibi logo" onClick={onClickHandler} />;
};

export default Logo;
