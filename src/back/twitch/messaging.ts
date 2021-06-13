import { Client } from 'tmi.js';
import { logError, logInfo } from '../utils/logger';
import { splitWords, trimStart } from '../utils/string';
import Database from '../core/database';

class TwitchMessaging {
  client;

  constructor() {
    this.client = new Client({
      identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_PASSWORD,
      },
      channels: ['#carorockwell'],
    });
    this.client.connect().then(logInfo).catch(logError);
    this.client.on('message', this.onMessage);
    this.client.on('hosted', this.onHosted);
  }

  onHosted = (channel, username) => {
    // eslint-disable-next-line no-console
    console.log(channel, username);
    this.client.say('#carorockwell', `@${username} thank you for the host !`).catch(logInfo);
  };

  onMessage = (channel, tags, message, self) => {
    if (self) return;
    const words = splitWords(message);
    if (words[0][0] === '!') {
      this.commands(channel, tags, words);
    }
  };

  commands(channel, tags, words) {
    const found = this.findCommand(words);
    if (found) {
      const { response, data } = found;
      data.push(['{me}', tags.username]);
      this.client.say(channel, this.populate(response, data));
    }
  }

  populate(response, data) {
    if (data.length === 0) {
      return response;
    }
    return data.reduce((acc, val) => acc.replace(new RegExp(val[0], 'g'), trimStart(val[1], '@').toLowerCase()), response);
  }

  findCommand(words): { data:Array<[string, string]>, response: string } {
    const needle = trimStart(words[0], '!');
    const commands = Database.db.get('commands').value();
    const matchingPattern = commands.find(([command]) => command.startsWith(needle));
    if (!matchingPattern) return null;
    const wordedPattern = splitWords(matchingPattern[0]);
    return {
      data: wordedPattern
        .map((val: string, index: number): [string, string] => [val, words[index] || '']).slice(1),
      response: matchingPattern[1],
    };
  }
}

export default new TwitchMessaging();
