import { DateTime } from 'luxon';
import Discord from '../../discord/core';
import { validateFields } from '../../utils/validate';
import { logInfo } from '../../utils/logger';
import { subscribeToWebhook } from '../core';
import Subscription from '../models/Subscription';

const generateNewEvent = async () => {
  const newEvent = new Subscription({
    type: 'live',
    expires: DateTime.now().plus({ second: 60 }),
  });
  await newEvent.save();
  subscribeToWebhook('https://api.twitch.tv/helix/streams?user_id=548876799');
};

setInterval(() => {
  Subscription.deleteOne({
    expires: { $lte: DateTime.now().minus({ seconds: 10 }) },
  }).exec().then(({ deletedCount }) => {
    if (deletedCount) {
      logInfo('Event expires soon, regen');
      generateNewEvent().then();
    } else {
      logInfo('No event update needed');
    }
  });
}, 10000);

export const subscribeEvent = async (req, res) => {
  const validation = validateFields(req.body, ['channel']);
  if (validation.length > 0) {
    return res.status(400).send(`Missing field ${validation.join(', ')}`);
  }
  Discord.channel = req.body.channel;
  await generateNewEvent();
  return res.send('ok');
};

export const acceptChallenge = (req, res) => {
  const hubChallenge = req.query['hub.challenge'];
  logInfo('Challenge accepted');
  res.send(hubChallenge);
};

export const handleLiveEvent = (req, res) => {
  if (!req.body.data || !req.body.data[0]) {
    return res.send();
  }
  const streamInfo = req.body.data[0];
  logInfo('Live event received');
  Discord.sendEmbedMessage('Hey @everyone Caro is live over at https://www.twitch.tv/carorockwell ! Venez les insolents !', {
    author: {
      name: 'Carorockwell',
      icon_url: 'https://images-ext-1.discordapp.net/external/Ekh9K5IqwNP313ZdvmYFf57f_FIdh0JDgruQBxuq1lw/https/static-cdn.jtvnw.net/jtv_user_pictures/d0fc61fb-b675-4ce7-b37a-63a1a22c5926-profile_image-300x300.png',
      url: 'https://www.twitch.tv/carorockwell',
    },
    title: streamInfo.title,
    image: {
      url: 'https://cdn.discordapp.com/attachments/849328296113471540/853348334375141406/carolive.jpg',
    },
    color: 'RED',
    url: 'https://www.twitch.tv/carorockwell',
    description: 'Carorockwell is now live on Twitch!',
  });
  return res.send();
};
