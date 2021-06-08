import { Client } from 'tmi.js';
import { logError, logInfo } from '../utils/logger';
import { splitWords, trimStart } from '../utils/string';

class TwitchMessaging {
  client;

  constructor() {
    this.client = new Client({
      identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_PASSWORD,
      },
      channels: ['k_talpa'],
    });
    this.client.connect().then(logInfo).catch(logError);
    this.client.on('message', this.onMessage);
  }

  onMessage = (channel, tags, message, self) => {
    if (self) return;
    const words = splitWords(message);
    if (words[0][0] === '!') {
      this.commands(channel, tags, words);
    }
    if (message.toLowerCase() === '!hello') {
      this.client.say(channel, `Check out ${tags.username} at https://www.twitch.tv/${tags.username}`);
    }
  };

  commands(channel, tags, words) {
    const command = trimStart(words[0], '!');
    if (command === 'so') {
      this.shoutOut(channel, trimStart(words[1], '@'));
    }
  }

  shoutOut(channel, username) {
    this.client.say(channel, `Check out ${username} at https://www.twitch.tv/${username}`);
  }
}

export default new TwitchMessaging();
