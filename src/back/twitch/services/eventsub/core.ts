import fetch from 'node-fetch';

import Auth from '../auth/core';
import { logError, logInfo } from '../../../utils/logger';

class EventSub {
  eventSubUrl: string = process.env.TWITCH_EVENTSUB_ROUTE;

  listSubscriptions() {
    return fetch(this.eventSubUrl, {
      headers: Auth.generateHeaders(),
    })
      .then((res) => res.json())
      .then(this.onSuccess)
      .catch(this.onError);
  }

  createSubscription(type?: string, userId?: string) {
    logInfo('Creating subscription');
    return fetch(this.eventSubUrl, {
      method: 'POST',
      headers: {
        ...Auth.generateHeaders(),
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        type: type || 'stream.online',
        version: '1',
        condition: {
          broadcaster_user_id: userId || '548876799',
        },
        transport: {
          method: 'webhook',
          callback: `${process.env.PUBLIC_URL}/twitch/event/callback`,
          secret: process.env.SECRET,
        },
      }),
    })
      .then((res) => res.json())
      .then(this.onSuccess)
      .catch(this.onError);
  }

  revokeSubscription(id) {
    fetch(`${this.eventSubUrl}?id=${id}`, {
      method: 'DELETE',
      headers: Auth.generateHeaders(),
    });
  }

  onSuccess = (jsonResponse) => {
    logError(jsonResponse.message);
    const { data } = jsonResponse;
    return data;
  };

  onError = (err) => {
    logError(err);
  };
}

export default new EventSub();
