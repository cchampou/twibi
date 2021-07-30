import { MessageEmbedOptions } from 'discord.js';
import { Stream } from '../../common/types';

// eslint-disable-next-line import/prefer-default-export
export const streamToDiscordEmbed: (streamData: Stream) => MessageEmbedOptions =
  (streamData) => ({
    title: streamData.title,
    color: 0xff0000,
    fields: [
      { name: '👇', value: 'https://www.twitch.tv/carorockwell', inline: true },
    ],
    author: {
      name: 'Carorockwell',
      iconURL:
        'https://images-ext-1.discordapp.net/external/Ekh9K5IqwNP313ZdvmYFf57f_FIdh0JDgruQBxuq1lw/https/static-cdn.jtvnw.net/jtv_user_pictures/d0fc61fb-b675-4ce7-b37a-63a1a22c5926-profile_image-300x300.png',
      url: 'https://www.twitch.tv/carorockwell',
    },
    url: 'https://www.twitch.tv/carorockwell',
    image: {
      proxy_url:
        'https://media.discordapp.net/attachments/828259641171378198/847016522668965918/IMG_20210518_215042_152.jpg?width=386&height=686',
    },
    thumbnail: {
      proxy_url:
        'https://images-ext-1.discordapp.net/external/Ekh9K5IqwNP313ZdvmYFf57f_FIdh0JDgruQBxuq1lw/https/static-cdn.jtvnw.net/jtv_user_pictures/d0fc61fb-b675-4ce7-b37a-63a1a22c5926-profile_image-300x300.png',
    },
    description: 'Viens nous rejoindre sur Twitch !',
  });
