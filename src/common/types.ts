export interface Stream {
  id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  game_id: string;
  game_name: string;
  type: string;
  title: string;
  viewer_count: number;
  started_at: string;
  language: string;
  thumbnail_url: string;
  tag_ids: string;
}

export interface Channel {
  broadcaster_id: string;
  broadcaster_name: string;
  game_name: string;
  game_id: string;
  broadcaster_language: string;
  title: string;
  delay: number;
}

export interface User {
  broadcaster_type: string;
  description: string;
  display_name: string;
  id: string;
  login: string;
  offline_image_url: string;
  profile_image_url: string;
  type: string;
  view_count: number;
  email: string;
  created_at: string;
}

export interface CommandType {
  command: string;
  response: string;
}
