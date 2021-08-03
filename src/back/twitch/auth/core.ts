import fetch from 'node-fetch';
import { logError, logSuccess } from '../../utils/logger';
import { generateHeaders } from './utils';

const AuthRequestParams = new URLSearchParams();
AuthRequestParams.append('client_id', process.env.TWITCH_CLIENT_ID);
AuthRequestParams.append('client_secret', process.env.TWITCH_CLIENT_SECRET);
AuthRequestParams.append('grant_type', 'client_credentials');

class Core {
  access_token: string;

  status: boolean = false;

  constructor() {
    this.generateAuthToken();
  }

  generateHeaders(): HeadersInit {
    return generateHeaders(this.access_token);
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
    logSuccess('Successfully generated a Twitch token');
  };

  onError = (e) => {
    logError(e);
    this.status = false;
  };
}

export default new Core();
