import { verify } from 'jsonwebtoken';
import { removeBearerFromAuthorization } from '../utils/string';
import User from '../twitch/models/User';

const authMiddleware = async (req, res, next) => {
  try {
    const token = removeBearerFromAuthorization(req.get('Authorization'));
    const { email, twitchUsername } = <
      { email: string; twitchUsername: string }
    >await verify(token, process.env.SECRET);
    req.user = await User.findOne({
      email,
      twitchUsername,
    });
    return next();
  } catch (e) {
    return res.status(401).send(e);
  }
};

export default authMiddleware;
