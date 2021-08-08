import EventSub from '../services/eventsub/core';
import { logError, logInfo } from '../../utils/logger';
import { validateFields } from '../../utils/validate';
import Notification from '../models/Notification';
import User from '../models/User';
import Messaging from '../services/messaging';
import { insertVariables } from '../../utils/string';

export const listSubscriptions = async (req, res) => {
  const result = await EventSub.listSubscriptions();
  return res.send(result);
};

export const createSubscription = async (req, res) => {
  const result = await EventSub.createSubscription();
  return res.send(result);
};

const sendMessage = (notificationInstruction, targetUser, variables) => {
  Messaging.rootClient
    .say(
      targetUser.twitchUsername,
      insertVariables(notificationInstruction.text, variables)
    )
    .catch(logError);
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
      if (!targetUser) return res.send('OK');
      const notificationInstruction = await Notification.findOne({
        eventType: 'follow',
        user: targetUser.id,
      });
      if (notificationInstruction) {
        sendMessage(notificationInstruction, targetUser, {
          username: req.body.event.user_name,
        });
      }
    }
    if (req.body.subscription.type === 'channel.subscribe') {
      const targetUser = await User.findOne({
        twitchUserId: req.body.event.broadcaster_user_id,
      });
      if (!targetUser) return res.send('OK');
      const notificationInstruction = await Notification.findOne({
        eventType: 'subscribe',
        user: targetUser.id,
      });
      if (notificationInstruction) {
        sendMessage(notificationInstruction, targetUser, {
          username: req.body.event.user_name,
        });
      }
    }
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
