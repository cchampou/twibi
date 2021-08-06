import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import { Global, css } from '@emotion/react';
import Router from './router';
import theme from './theme';

const globalStyles = css`
  body {
    background-color: ${theme.colors.black};
    margin: 0;
    color: ${theme.colors.white};
    font-size: 20px;
    font-family: Helvetica, Open-Sans;
    font-weight: lighter;
  }
`;

const socket = io('/');

socket.on('connect', () => {});

// eslint-disable-next-line no-console
console.log('Script loaded');

const App = () => (
  <>
    <Global styles={globalStyles} />
    <Router />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
