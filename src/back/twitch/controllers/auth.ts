import Helix from '../helix/core';
import { generateJWT } from '../auth/utils';
import User from '../models/User';

export const login = async (req, res) => {
  try {
    const data = await Helix.getUser(req.body.token);
    if (data.email !== 'clement@champouillon.com') {
      return res.status(401).send();
    }
    await User.create({
      email: data.email,
      twitchUsername: data.login,
      twitchAccessToken: req.body.token,
    });
    const token = generateJWT(data.email);
    return res.send(token);
  } catch (e) {
    return res.status(500).send();
  }
};
