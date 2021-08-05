import {
  createSubscription,
  listSubscriptions,
  revokeSubscription,
  callback,
  getChannelInfo,
} from './controllers/events';
import {
  clearCommands,
  createCommand,
  listCommands,
} from './controllers/commands';
import { login } from './controllers/auth';
import { subscribeHost } from './controllers/notification';

const express = require('express');

const router = express.Router();

router.post('/login', login);

// Notification subscribe
router.post('/subscribe/host', subscribeHost);

// Events
router.get('/event', listSubscriptions);
router.post('/event', createSubscription);
router.delete('/event', revokeSubscription);
router.post('/event/callback', callback);

router.get('/channel', getChannelInfo);

// Commands
router.post('/commands', createCommand);
router.get('/commands', listCommands);
router.delete('/commands', clearCommands);

export default router;
