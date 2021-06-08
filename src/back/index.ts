import './env';
import express from 'express';
import './core/database';
import './discord/core';
import './twitch/messaging';
import Network from './network';

import discordRouter from './discord/router';
import twitchRouter from './twitch/router';
import { logInfo } from './utils/logger';

Network.App.use(express.json());
Network.App.use(express.static('dist'));

Network.App.use('/discord', discordRouter);
Network.App.use('/twitch', twitchRouter);

Network.App.get('/status', (req, response) => {
  response.send('ok');
});

Network.HttpServer.listen(process.env.SERVER_PORT, () => {
  logInfo(`Application is started on port ${process.env.SERVER_PORT}`);
});
