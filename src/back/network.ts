import { Server } from 'socket.io';
import { createServer } from 'http';
import { logInfo } from './utils/logger';

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
      logInfo(`New client connected with id ${socket.id}`);
    });
  }
}

export default new Network();
