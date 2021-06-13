import { acceptChallenge, handleLiveEvent, subscribeEvent } from './controllers/events';
import { clearCommands, createCommand, listCommands } from './controllers/commands';

const express = require('express');

const router = express.Router();

// Events
router.post('/event', subscribeEvent);
router.get('/event/callback/live', acceptChallenge);
router.post('/event/callback/live', handleLiveEvent);

// Commands
router.post('/commands', createCommand);
router.get('/commands', listCommands);
router.delete('/commands', clearCommands);

export default router;
