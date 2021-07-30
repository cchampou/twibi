import EventSub from '../eventsub/core';
import { logInfo } from '../../utils/logger';
import { validateFields } from '../../utils/validate';
import Discord from '../../discord/core';
import HelixApi from '../helix/core';

export const listSubscriptions = async (req, res) => {
  const result = await EventSub.listSubscriptions();
  return res.send(result);
};

export const createSubscription = async (req, res) => {
  const result = await EventSub.createSubscription();
  return res.send(result);
};

export const getChannelInfo = async (req, res) => {
  const data = await HelixApi.getChannelInfo(548876799);
  return res.send(data);
};

export const callback = async (req, res) => {
  if (req.body.challenge) {
    const { challenge } = req.body;
    logInfo('Challenge accepted 💪');
    return res.send(challenge);
  }
  if (req.body.event) {
    logInfo('Event received 🔥');
    const { title } = await HelixApi.getChannelInfo(548876799);
    Discord.sendEmbedMessage(
      'Hey @everyone ! Caro is live over at https://www.twitch.tv/carorockwell ! Venez les insolents !',
      {
        author: {
          name: 'Carorockwell',
          icon_url:
            'https://images-ext-1.discordapp.net/external/Ekh9K5IqwNP313ZdvmYFf57f_FIdh0JDgruQBxuq1lw/https/static-cdn.jtvnw.net/jtv_user_pictures/d0fc61fb-b675-4ce7-b37a-63a1a22c5926-profile_image-300x300.png',
          url: 'https://www.twitch.tv/carorockwell',
        },
        title,
        image: {
          url: 'https://media.discordapp.net/attachments/828259641171378198/865314428873474088/Screenshot_20210715-212956_Instagram.jpg?width=404&height=686',
        },
        color: 'RED',
        url: 'https://www.twitch.tv/carorockwell',
        description: 'Carorockwell is now live on Twitch!',
      }
    );
    return res.send('OK');
  }
  return res.send('OK');
};

export const revokeSubscription = async (req, res) => {
  if (!validateFields(req.query, ['id'])) {
    return res.status(400).send('Missing param id');
  }
  EventSub.revokeSubscription(req.query.id);
  return res.send('OK');
};
