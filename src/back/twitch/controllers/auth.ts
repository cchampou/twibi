import Helix from '../services/helix/core';
import { generateJWT } from '../services/auth/utils';
import User from '../models/User';
import whitelist from '../../../whitelist';

export const login = async (req, res) => {
  try {
    const data = await Helix.getUser(req.body.token);
    if (!whitelist.includes(data.email.toLocaleLowerCase())) {
      return res.status(401).send();
    }
    const existingUser = await User.findOne({
      email: data.email,
      twitchUsername: data.login,
    });
    if (existingUser) {
      existingUser.twitchAccessToken = req.body.token;
      await existingUser.save();
    } else {
      await User.create({
        email: data.email,
        twitchUsername: data.login,
        twitchUserId: data.id,
        twitchAccessToken: req.body.token,
      });
    }
    const token = generateJWT(data.email, data.login);
    return res.send(token);
  } catch (e) {
    return res.status(500).send();
  }
};
