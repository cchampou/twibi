import Discord from '../discord/core';
import { logInfo } from '../utils/logger';
import Database from '../core/database';

const express = require('express');

const router = express.Router();
const { validateFields } = require('../utils/validate');
const { subscribeToWebhook } = require('./core');

router.get('/event/callback', (req, res) => {
  const hubChallenge = req.query['hub.challenge'];
  logInfo('Responding to challenge');
  res.send(hubChallenge);
});

router.post('/event/callback', (req, res) => {
  res.send();
});

router.post('/commands', (req, res) => {
  const validation = validateFields(req.body, ['command', 'response']);
  if (validation.length > 0) {
    return res.status(400).send(`Missing field ${validation.join(', ')}`);
  }
  Database.db.get('commands').push([req.body.command, req.body.response]).save();
  return res.send();
});

router.get('/commands', (req, res) => {
  const commands = Database.db.get('commands').value();
  return res.send(commands);
});

router.delete('/commands', (req, res) => {
  Database.db.set('commands', []).save();
  return res.send();
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
