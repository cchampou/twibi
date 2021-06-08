import { Stream } from '../../common/types';

import Discord from '../discord/core';
import { streamToDiscordEmbed } from '../utils/converter';
import { logInfo } from '../utils/logger';

const express = require('express');

const router = express.Router();
const { validateFields } = require('../utils/validate');
const { subscribeToWebhook } = require('./core');

router.get('/event/callback', (req, res) => {
  const hubChallenge = req.query['hub.challenge'];
  logInfo('Responding to challenge');
  res.send(hubChallenge);
});

router.post('/event/callback', (request, response) => {
  console.log(request.body);
  // if (request.body.data[0]) {
  // const stream: Stream = request.body.data[0];
  // Discord.sendEmbedMessage(streamToDiscordEmbed(stream));
  // }
  response.send();
});

router.post('/event', (req, res) => {
  const validation = validateFields(req.body, ['channel']);
  if (validation.length > 0) {
    return res.status(400).send(`Missing field ${validation.join(', ')}`);
  }
  Discord.channel = req.body.channel;
  subscribeToWebhook('https://api.twitch.tv/helix/users/follows?first=1&to_id=654556126');
  return res.send('ok');
});

export default router;
