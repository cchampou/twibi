/**
 * Generate twitch OAuth link
 * @param {string} clientId
 * @returns {string} url
 */
// eslint-disable-next-line import/prefer-default-export
export const generateTwitchOAuthLink = (clientId) => `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=http://localhost:8000&response_type=token&scope=user:read:email`;