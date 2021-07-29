import fetch from 'node-fetch';
import { logError } from '../../utils/logger';
import Auth from '../auth';
import { Channel, User } from '../../../common/types';

class HelixApi {
  baseRoute: string = process.env.TWITCH_HELIX_ROUTE;

  getChannelInfo(id: number): Promise<Channel> {
    return fetch(`${this.baseRoute}/channels?broadcaster_id=${id}`, {
      headers: Auth.generateHeaders(),
    }).then((res) => res.json())
      .then(({ data }) => data[0])
      .catch((err) => logError(err));
  }

  getUser(username: string): Promise<User> {
    return fetch(`${this.baseRoute}/users?login=${username}`, {
      headers: Auth.generateHeaders(),
    }).then((res) => res.json())
      .then(({ data }) => data[0])
      .catch((err) => logError(err));
  }
}

export default new HelixApi();
