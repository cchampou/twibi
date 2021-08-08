import Notification from '../models/Notification';
import TwitchMessaging from '../services/messaging';
import { logError } from '../../utils/logger';
import EventSub from '../services/eventsub/core';

const createOrUpdate = async (user, type, text) => {
  const existing = await Notification.findOne({ user, eventType: type });
  if (existing) {
    existing.text = text;
    await existing.save();
  } else {
    await Notification.create({ user, eventType: type, text });
  }
};

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
    await createOrUpdate(req.user, req.params.type, req.body.text);
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
    await createOrUpdate(req.user, 'host', req.body.text);
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
