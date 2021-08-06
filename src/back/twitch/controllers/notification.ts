import { verify } from 'jsonwebtoken';
import Notification from '../models/Notification';
import { removeBearerFromAuthorization } from '../../utils/string';
import User from '../models/User';
import TwitchMessaging from '../services/messaging';
import { logError } from '../../utils/logger';

export const subscribeHost = async (req, res) => {
  try {
    const token = removeBearerFromAuthorization(req.get('Authorization'));
    const { email, twitchUsername } = await verify(token, process.env.SECRET);
    const user = await User.findOne({
      email,
      twitchUsername,
    });
    await Notification.create({ user });
    await TwitchMessaging.checkForNotificationNeed();
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const unsubscribeHost = async (req, res) => {
  try {
    const token = removeBearerFromAuthorization(req.get('Authorization'));
    const { email, twitchUsername } = await verify(token, process.env.SECRET);
    const user = await User.findOne({
      email,
      twitchUsername,
    });
    await Notification.deleteOne({ user });
    await TwitchMessaging.checkForNotificationNeed();
    return res.send('OK');
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};

export const getHost = async (req, res) => {
  try {
    const token = removeBearerFromAuthorization(req.get('Authorization'));
    const { email, twitchUsername } = await verify(token, process.env.SECRET);
    const user = await User.findOne({
      email,
      twitchUsername,
    });
    const data = await Notification.findOne({ user });
    return res.send(data);
  } catch (e) {
    logError(e);
    return res.status(500).send(e);
  }
};
