import fetch from 'node-fetch';
import Auth from './auth';
import { logInfo, logWarn } from '../utils/logger';

// eslint-disable-next-line import/prefer-default-export
export const subscribeToWebhook: (topic: string) => void = (topic) => {
  const EventRequestParams = new URLSearchParams();
  EventRequestParams.append('hub.mode', 'subscribe');
  EventRequestParams.append('hub.topic', topic);
  EventRequestParams.append('hub.callback', 'http://176.190.176.219:8000/twitch/event/callback');
  EventRequestParams.append('hub.lease_seconds', '60');
  EventRequestParams.append('hub.secret', 'original');
  fetch('https://api.twitch.tv/helix/webhooks/hub', {
    method: 'POST',
    body: EventRequestParams,
    headers: Auth.generateHeaders(),
  })
    .then((res) => {
      logInfo(res.status.toString());
      return res.text();
    })
    .then((text) => {
      if (text.length) {
        logWarn(text);
      }
    });
};
