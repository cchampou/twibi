import fetch from 'node-fetch';
import { logError, logInfo } from '../utils/logger';

const AuthRequestParams = new URLSearchParams();
AuthRequestParams.append('client_id', process.env.TWITCH_CLIENT_ID);
AuthRequestParams.append('client_secret', process.env.TWITCH_CLIENT_SECRET);
AuthRequestParams.append('grant_type', 'client_credentials');

class Auth {
  access_token: string;

  status: boolean = false;

  constructor() {
    this.generateAuthToken();
  }

  generateHeaders(): HeadersInit {
    return {
      Authorization: `Bearer ${this.access_token}`,
      'client-id': process.env.TWITCH_CLIENT_ID,
    };
  }

  generateAuthToken(): void {
    fetch(process.env.TWITCH_AUTH_ROUTE, {
      method: 'POST',
      body: AuthRequestParams,
    })
      .then((res) => res.json())
      .then(this.onSuccess)
      .catch(this.onError);
  }

  onSuccess = (json) => {
    this.access_token = json.access_token;
    this.status = true;
    logInfo('Successfully generated a Twitch token');
  };

  onError = (e) => {
    logError(e);
    this.status = false;
  };
}

export default new Auth();
