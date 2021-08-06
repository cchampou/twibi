import { sign } from 'jsonwebtoken';

export const generateHeaders = (access_token) => ({
  Authorization: `Bearer ${access_token}`,
  'client-id': process.env.TWITCH_CLIENT_ID,
});

export const generateJWT = (email, twitchUsername) =>
  sign({ email, twitchUsername }, process.env.SECRET);
