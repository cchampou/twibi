import { Client } from 'tmi.js';
import { logError, logInfo, logSuccess, logWarn } from '../../utils/logger';
import { insertVariables, splitWords, trimStart } from '../../utils/string';
import Command from '../models/Command';
import { CommandType } from '../../../common/types';
import Notification from '../models/Notification';

class TwitchMessaging {
  rootClient;

  clients;

  constructor() {
    this.clients = [];
    this.rootClient = this.connect(
      process.env.TWITCH_BOT_USERNAME,
      process.env.TWITCH_BOT_PASSWORD
    );
    this.checkForNotificationNeed().then(() => null);
  }

  connect(
    username: string,
    password: string,
    opts: { hostText: string } = { hostText: 'New host' }
  ) {
    const newClient = new Client({
      identity: {
        username,
        password,
      },
      channels: [username],
    });
    newClient
      .connect()
      .then(() => logSuccess(`New chat connected for user ${username}`))
      .catch(logError);
    newClient.on('hosted', this.onHosted(opts.hostText));
    newClient.on('message', this.onMessage);
    return newClient;
  }

  checkForNotificationNeed = async () => {
    this.clients.forEach((client) => {
      client.disconnect().then(() => logWarn('Client disconnected'));
    });
    this.clients = [];
    try {
      const notifications = await Notification.find({
        eventType: 'host',
      }).populate('user');
      notifications.forEach(
        ({ user: { twitchUsername, twitchAccessToken }, text }: any) => {
          this.clients.push(
            this.connect(twitchUsername, twitchAccessToken, { hostText: text })
          );
        }
      );
    } catch (e) {
      logError(e);
    }
  };

  onHosted = (text: string) => async (channel, username) => {
    this.rootClient
      .say(channel, insertVariables(text, { username }))
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
      const { response } = found;
      // data.push(['{me}', tags.username]);
      this.rootClient.say(channel, response);
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
