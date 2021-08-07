import EventSub from '../services/eventsub/core';
import { logError, logInfo } from '../../utils/logger';
import { validateFields } from '../../utils/validate';
import Notification from '../models/Notification';
import User from '../models/User';
import Messaging from '../services/messaging';

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
    logInfo('Event received 🔥');
    if (req.body.subscription.type === 'channel.follow') {
      const targetUser = await User.findOne({
        twitchUserId: req.body.event.broadcaster_user_id,
      });
      const notificationInstruction = await Notification.findOne({
        eventType: 'follow',
        user: targetUser,
      });
      if (notificationInstruction) {
        Messaging.rootClient
          .say(
            targetUser.twitchUsername,
            `${req.body.event.user_name} is now following you !`
          )
          .catch(logError);
      }
    }
    if (req.body.subscription.type === 'channel.subscribe') {
      const targetUser = await User.findOne({
        twitchUserId: req.body.event.broadcaster_user_id,
      });
      const notificationInstruction = await Notification.findOne({
        eventType: 'subscribe',
        user: targetUser,
      });
      if (notificationInstruction) {
        Messaging.rootClient
          .say(
            targetUser.twitchUsername,
            `${req.body.event.user_name} subscribed to the channel !`
          )
          .catch(logError);
      }
    }
    // const { title } = await HelixApi.getChannelInfo(548876799);
    // Discord.sendEmbedMessage(
    //   'Hey @everyone ! Caro is live over at https://www.twitch.tv/carorockwell ! Venez les insolents !',
    //   {
    //     author: {
    //       name: 'Carorockwell',
    //       icon_url:
    //         'https://images-ext-1.discordapp.net/external/Ekh9K5IqwNP313ZdvmYFf57f_FIdh0JDgruQBxuq1lw/https/static-cdn.jtvnw.net/jtv_user_pictures/d0fc61fb-b675-4ce7-b37a-63a1a22c5926-profile_image-300x300.png',
    //       url: 'https://www.twitch.tv/carorockwell',
    //     },
    //     title,
    //     image: {
    //       url: 'https://media.discordapp.net/attachments/828259641171378198/865314428873474088/Screenshot_20210715-212956_Instagram.jpg?width=404&height=686',
    //     },
    //     color: 'RED',
    //     url: 'https://www.twitch.tv/carorockwell',
    //     description: 'Carorockwell is now live on Twitch!',
    //   }
    // );
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
