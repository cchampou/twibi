import Discord from './core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const router = express.Router();

router.get('/channel', (req, res) => {
  const channels = Discord.listChannels().filter(({ type }) => type === 'text' || type === 'news');
  res.send(channels);
});

export default router;
