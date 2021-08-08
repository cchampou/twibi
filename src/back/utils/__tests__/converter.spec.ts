import { streamToDiscordEmbed } from '../converter';
import { Stream } from '../../../common/types';

const sampleData: Stream = {
  id: '123',
  user_id: '123456',
  user_login: 'bg',
  user_name: 'BG',
  game_id: 'sample',
  game_name: 'sample',
  type: 'sample',
  title: 'Titre du stream',
  viewer_count: 5,
  started_at: 'a date',
  language: 'sample',
  thumbnail_url: 'sample',
  tag_ids: 'sample',
};

describe('streamToDiscordEmbed', () => {
  it('should match the previous format', () => {
    expect(streamToDiscordEmbed(sampleData)).toMatchSnapshot();
  });
});
