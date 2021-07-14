import {
  createSubscription, listSubscriptions, revokeSubscription, callback,
} from './controllers/events';
import { clearCommands, createCommand, listCommands } from './controllers/commands';

const express = require('express');

const router = express.Router();

// Events
router.get('/event', listSubscriptions);
router.post('/event', createSubscription);
router.delete('/event', revokeSubscription);
router.post('/event/callback', callback);

// Commands
router.post('/commands', createCommand);
router.get('/commands', listCommands);
router.delete('/commands', clearCommands);

export default router;
