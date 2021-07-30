import {
  MessageEmbed,
  MessageEmbedOptions,
  Client,
  Channel,
  TextChannel,
} from 'discord.js';
import { logError, logSuccess } from '../utils/logger';

class DiscordClass {
  client: Client;

  channel;

  constructor() {
    this.client = new Client();
    this.channel = '849328296113471540';
    this.connectClient();
  }

  connectClient() {
    this.client.on('ready', this.onConnected);
    this.client
      .login(process.env.DISCORD_TOKEN)
      .then(() => null)
      .catch(this.onError);
  }

  listChannels(): Channel[] {
    return this.client.channels.cache.array();
  }

  sendTextMessage(message: string) {
    const channel = <TextChannel>this.client.channels.cache.get(this.channel);
    channel.send(message).then(() => null);
  }

  sendEmbedMessage(message: string, embedData: MessageEmbedOptions) {
    const embed = new MessageEmbed(embedData);
    const channel = <TextChannel>this.client.channels.cache.get(this.channel);
    channel.send(message, { embed }).then(() => null);
  }

  onConnected = () => {
    logSuccess(`Logged in as ${this.client.user.tag}!`);
  };

  onError = (e) => {
    logError(e.message);
  };
}

export default new DiscordClass();
