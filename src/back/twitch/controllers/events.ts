import EventSub from '../eventsub/core';
import { logInfo } from '../../utils/logger';
import { validateFields } from '../../utils/validate';
import Discord from '../../discord/core';

export const listSubscriptions = async (req, res) => {
  const result = await EventSub.listSubscriptions();
  return res.send(result);
};

export const createSubscription = async (req, res) => {
  const result = await EventSub.createSubscription();
  return res.send(result);
};

export const callback = async (req, res) => {
  if (req.body.challenge) {
    const { challenge } = req.body;
    logInfo('Challenge accepted 💪');
    return res.send(challenge);
  }
  if (req.body.event) {
    const { event } = req.body;
    logInfo('Event received 🔥');
    Discord.sendEmbedMessage('Hey Caro is live over at https://www.twitch.tv/carorockwell ! Venez les insolents !', {
      author: {
        name: 'Carorockwell',
        icon_url: 'https://images-ext-1.discordapp.net/external/Ekh9K5IqwNP313ZdvmYFf57f_FIdh0JDgruQBxuq1lw/https/static-cdn.jtvnw.net/jtv_user_pictures/d0fc61fb-b675-4ce7-b37a-63a1a22c5926-profile_image-300x300.png',
        url: 'https://www.twitch.tv/carorockwell',
      },
      title: 'Let\'s go !',
      image: {
        url: 'https://cdn.discordapp.com/attachments/849328296113471540/853348334375141406/carolive.jpg',
      },
      color: 'RED',
      url: 'https://www.twitch.tv/carorockwell',
      description: 'Carorockwell is now live on Twitch!',
    });
    return res.send(event);
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
