import Notification from '../models/Notification';
import TwitchMessaging from '../services/messaging';
import { logError } from '../../utils/logger';

export const subscribeHost = async (req, res) => {
  try {
    await Notification.create({ user: req.user });
    await TwitchMessaging.checkForNotificationNeed();
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const unsubscribeHost = async (req, res) => {
  try {
    await Notification.deleteOne({ user: req.user });
    await TwitchMessaging.checkForNotificationNeed();
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const getHost = async (req, res) => {
  try {
    const data = await Notification.findOne({ user: req.user });
    return res.send(data);
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};
