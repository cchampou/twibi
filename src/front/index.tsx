import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import { Global, css } from '@emotion/react';
import Router from './router';
import theme from './theme';

const globalStyles = css`
  body {
    background-color: ${theme.colors.primary};
    margin: 0;
    color: ${theme.colors.white};
  }
`;

const socket = io('/');

socket.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log(socket.id);
});

socket.on('follow', (username) => {
  // eslint-disable-next-line no-console
  console.log(username);
});

// eslint-disable-next-line no-console
console.log('Script loaded');

const App = () => (
  <>
    <Global styles={globalStyles} />
    <Router />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
