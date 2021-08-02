import { Client } from 'tmi.js';
import { logError, logInfo } from '../utils/logger';
import { splitWords, trimStart } from '../utils/string';
import Command from './models/Command';
import { CommandType } from '../../common/types';

class TwitchMessaging {
  client;

  constructor() {
    this.client = new Client({
      identity: {
        username: process.env.TWITCH_BOT_USERNAME,
        password: process.env.TWITCH_BOT_PASSWORD,
      },
      channels: ['#k_talpa'],
    });
    this.client.connect().then(logInfo).catch(logError);
    this.client.on('message', this.onMessage);
    this.client.on('hosted', this.onHosted);
  }

  onHosted = (channel, username, viewers) => {
    // eslint-disable-next-line no-console
    console.log(channel, username);
    this.client
      .say(
        '#carorockwell',
        `@${username} is hosting the stream with ${viewers} viewers`
      )
      .catch(logInfo);
  };

  onMessage = (channel, tags, message, self) => {
    if (self) return;
    const words = splitWords(message);
    if (words[0][0] === '!') {
      this.commands(channel, tags, words);
    }
  };

  async commands(channel, tags, words) {
    const found = await this.findCommand(words);
    if (found) {
      const { response, data } = found;
      data.push(['{me}', tags.username]);
      this.client.say(channel, this.populate(response, data));
    }
  }

  populate = (response, data) => {
    if (data.length === 0) {
      return response;
    }
    return data.reduce(
      (acc, val) =>
        acc.replace(
          new RegExp(val[0], 'g'),
          trimStart(val[1], '@').toLowerCase()
        ),
      response
    );
  };

  findCommand = async (words) => {
    const needle = trimStart(words[0], '!');
    const commands: Array<CommandType> = await Command.find({});
    const matchingPattern = commands.find(({ command }) =>
      command.startsWith(needle)
    );
    if (!matchingPattern) return null;
    return {
      data: matchingPattern.command.split(' '),
      response: matchingPattern.response,
    };
  };
}

export default new TwitchMessaging();
