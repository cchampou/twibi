import { Server } from 'socket.io';
import { createServer } from 'http';

const socketIo = require('socket.io');
const express = require('express');

class Network {
  App: any;

  HttpServer;

  IO: Server;

  constructor() {
    this.App = express();
    this.HttpServer = createServer(this.App);
    this.IO = socketIo(this.HttpServer, {});
    this.IO.on('connection', (socket) => {
      // eslint-disable-next-line no-console
      console.log(socket.id);
    });
  }
}

export default new Network();
