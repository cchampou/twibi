import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { removeBearerFromAuthorization } from '../utils/string';
import User, { UserType } from '../twitch/models/User';
import { logError } from '../utils/logger';

type RequestWithUser = Request & {
  user?: UserType;
};

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
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
    logError(e);
    return res.status(401).send(e);
  }
};

export default authMiddleware;
