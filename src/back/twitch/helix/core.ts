import fetch from 'node-fetch';
import { logError } from '../../utils/logger';
import Auth from '../auth/core';
import { Channel, User } from '../../../common/types';
import { generateHeaders } from '../auth/utils';

class HelixApi {
  baseRoute: string = process.env.TWITCH_HELIX_ROUTE;

  getChannelInfo(id: number): Promise<Channel> {
    return fetch(`${this.baseRoute}/channels?broadcaster_id=${id}`, {
      headers: Auth.generateHeaders(),
    })
      .then((res) => res.json())
      .then(({ data }) => data[0])
      .catch((err) => logError(err));
  }

  generateGetUserUrl(username?: string) {
    return username
      ? `${this.baseRoute}/users?login=${username}`
      : `${this.baseRoute}/users`;
  }

  getUser(access_token: string, username?: string): Promise<User> {
    return fetch(this.generateGetUserUrl(username), {
      headers: generateHeaders(access_token),
    })
      .then((res) => res.json())
      .then(({ data }) => data[0])
      .catch((err) => logError(err));
  }
}

export default new HelixApi();
