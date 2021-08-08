import { generateTwitchOAuthLink } from '../twitch';

describe('generateTwitchOAuthLink', () => {
  it('should match snapshot', () => {
    expect(generateTwitchOAuthLink('client-id')).toMatchSnapshot();
  });
});
