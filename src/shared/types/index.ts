export interface UserResponse {
  id: number
  lichess_id: string
  username: string
}

export interface PerfRating {
  rating: number
  games: number
  rd?: number | null
  prog?: number | null
  prov?: boolean | null
}

export interface ProfileResponse {
  username: string
  avatar?: string | null
  url: string
  ratings: Record<string, PerfRating>
  createdAt: number
  seenAt: number
}

export interface GameResponse {
  id: string
  created_at: string
  perf_type: string
  time_control: string | null
  opponent_name: string
  opponent_rating: number | null
  user_color: string
  result: string
  termination: string
  url: string
}

export interface GamesListResponse {
  items: GameResponse[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface SyncResponse {
  task_id: string
  message: string
}

export interface SyncStatusResponse {
  task_id: string
  state: string
  current: number
  total: number
  percent: number
  message: string
  result?: Record<string, any> | null
}
