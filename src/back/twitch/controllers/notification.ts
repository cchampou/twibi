import Notification from '../models/Notification';
import TwitchMessaging from '../services/messaging';
import { logError } from '../../utils/logger';
import EventSub from '../services/eventsub/core';

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

export const getHost = async (req, res) => {
  try {
    const data = await Notification.findOne({
      user: req.user,
      eventType: 'host',
    });
    return res.send(data);
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

// FOLLOW

export const subscribeFollow = async (req, res) => {
  try {
    await Notification.create({ user: req.user, eventType: 'follow' });
    EventSub.createSubscription('channel.follow', req.user.twitchUserId);
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const unsubscribeFollow = async (req, res) => {
  try {
    await Notification.deleteOne({ user: req.user, eventType: 'follow' });
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const getFollow = async (req, res) => {
  try {
    const data = await Notification.findOne({
      user: req.user,
      eventType: 'follow',
    });
    return res.send(data);
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};
