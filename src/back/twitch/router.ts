import {
  callback,
  createSubscription,
  listSubscriptions,
  revokeSubscription,
} from './controllers/events';
import {
  clearCommands,
  createCommand,
  listCommands,
} from './controllers/commands';
import { login } from './controllers/auth';
import {
  get,
  subscribe,
  subscribeHost,
  unsubscribe,
  unsubscribeHost,
} from './controllers/notification';
import authMiddleware from '../core/auth.middleware';

const express = require('express');

const router = express.Router();

router.post('/login', login);

// Notification subscribe
router.use('/subscribe', authMiddleware);

router.get('/subscribe/:type', get);

router.post('/subscribe/host', subscribeHost);
router.post('/subscribe/:type', subscribe);

router.delete('/subscribe/host', unsubscribeHost);
router.delete('/subscribe/:type', unsubscribe);

// Events
router.get('/event', listSubscriptions);
router.post('/event', createSubscription);
router.delete('/event', revokeSubscription);
router.post('/event/callback', callback);

// Chatbot
router.post('/commands', createCommand);
router.get('/commands', listCommands);
router.delete('/commands', clearCommands);

export default router;
