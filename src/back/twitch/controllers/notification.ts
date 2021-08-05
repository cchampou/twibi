import { verify } from 'jsonwebtoken';
import Notification from '../models/Notification';
import { removeBearerFromAuthorization } from '../../utils/string';
import User from '../models/User';

export const subscribeHost = async (req, res) => {
  try {
    const token = removeBearerFromAuthorization(req.get('Authorization'));
    const { email } = await verify(token, process.env.SECRET);
    const user = await User.findOne({
      email,
    });
    await Notification.create({ user });
    return res.send('OK');
  } catch (e) {
    return res.status(500).send(e);
  }
};
