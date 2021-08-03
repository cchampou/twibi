import Helix from '../helix/core';
import { generateJWT } from '../auth/utils';

export const login = async (req, res) => {
  try {
    const data = await Helix.getUser(req.body.token);
    if (data.email !== 'clement@champouillon.com') {
      return res.status(401).send();
    }
    const token = generateJWT(data.email);
    return res.send(token);
  } catch (e) {
    return res.status(500).send();
  }
};
