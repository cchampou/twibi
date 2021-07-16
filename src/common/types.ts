export interface Stream {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_id: string
  game_name: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string
}

export interface Channel {
  broadcaster_id: string
  broadcaster_name: string
  game_name: string
  game_id: string
  broadcaster_language: string
  title: string
  delay: number
}
