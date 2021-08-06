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
import {
  getFollow,
  getHost,
  subscribeFollow,
  subscribeHost,
  unsubscribeFollow,
  unsubscribeHost,
} from './controllers/notification';
import authMiddleware from '../core/auth.middleware';

const express = require('express');

const router = express.Router();

router.post('/login', login);

// Notification subscribe
router.use('/subscribe', authMiddleware);
router.post('/subscribe/host', subscribeHost);
router.get('/subscribe/host', getHost);
router.delete('/subscribe/host', unsubscribeHost);
router.post('/subscribe/follow', subscribeFollow);
router.get('/subscribe/follow', getFollow);
router.delete('/subscribe/follow', unsubscribeFollow);

// Events
router.get('/event', listSubscriptions);
router.post('/event', createSubscription);
router.delete('/event', revokeSubscription);
router.post('/event/callback', callback);

router.get('/channel', getChannelInfo);

// Chatbot
router.post('/commands', createCommand);
router.get('/commands', listCommands);
router.delete('/commands', clearCommands);

export default router;
