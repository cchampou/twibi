import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import Discord from './discord';

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
    <h1>Twibi Dashboard</h1>
    <Discord />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
