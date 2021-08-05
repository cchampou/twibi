import { Client } from 'tmi.js';
import { logError, logInfo, logSuccess } from '../utils/logger';
import { splitWords, trimStart } from '../utils/string';
import Command from './models/Command';
import { CommandType } from '../../common/types';
import Notification from './models/Notification';

class TwitchMessaging {
  rootClient;

  clients;

  constructor() {
    this.rootClient = this.connect(
      process.env.TWITCH_BOT_USERNAME,
      process.env.TWITCH_BOT_PASSWORD
    );
    this.rootClient.on('message', this.onMessage);
    this.rootClient.on('hosted', this.onHosted);
    this.checkForNotificationNeed();
  }

  connect(username: string, password: string) {
    const newClient = new Client({
      identity: {
        username,
        password,
      },
      channels: ['#k_talpa'],
    });
    newClient
      .connect()
      .then(() => logSuccess(`New chat connected for user ${username}`))
      .catch(logError);

    return newClient;
  }

  checkForNotificationNeed = async () => {
    try {
      const notifs = await Notification.find().populate('user');
      notifs.map(({ user: { twitchUsername, twitchAccessToken } }) => {
        this.connect(twitchUsername, twitchAccessToken);
      });
    } catch (e) {
      logError(e);
    }
  };

  onHosted = (channel, username, viewers) => {
    // eslint-disable-next-line no-console
    console.log(channel, username);
    this.rootClient
      .say(
        '#k_talpa',
        `@${username} is hosting the stream with ${viewers} viewers`
      )
      .catch(logInfo);
  };

  onMessage = (channel, tags, message, self) => {
    if (self) return;
    console.log(message);
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
      this.rootClient.say(channel, this.populate(response, data));
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
