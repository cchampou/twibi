import Notification from '../models/Notification';
import TwitchMessaging from '../services/messaging';
import { logError } from '../../utils/logger';
import EventSub from '../services/eventsub/core';

export const get = async (req, res) => {
  try {
    const data = await Notification.findOne({
      user: req.user,
      eventType: req.params.type,
    });
    return res.send(data);
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const subscribe = async (req, res) => {
  try {
    await Notification.create({ user: req.user, eventType: req.params.type });
    EventSub.createSubscription(
      `channel.${req.params.type}`,
      req.user.twitchUserId
    );
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const unsubscribe = async (req, res) => {
  try {
    await Notification.deleteOne({
      user: req.user,
      eventType: req.params.type,
    });
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

// HOST

export const subscribeHost = async (req, res) => {
  try {
    await Notification.create({ user: req.user, eventType: 'host' });
    await TwitchMessaging.checkForNotificationNeed();
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const unsubscribeHost = async (req, res) => {
  try {
    await Notification.deleteOne({ user: req.user, eventType: 'host' });
    await TwitchMessaging.checkForNotificationNeed();
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};
