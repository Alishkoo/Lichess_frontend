import { apiClient } from './client'
import type { GamesListResponse, SyncResponse, SyncStatusResponse } from '../types'

export const gamesService = {
  async getGames(
    page: number = 1,
    limit: number = 20,
    perf_type?: string
  ): Promise<GamesListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (perf_type) {
      params.append('perf_type', perf_type)
    }

    return apiClient.get<GamesListResponse>(`/api/games?${params.toString()}`)
  },

  async syncGames(): Promise<SyncResponse> {
    return apiClient.post<SyncResponse>('/api/games/sync')
  },

  async getSyncStatus(task_id: string): Promise<SyncStatusResponse> {
    return apiClient.get<SyncStatusResponse>(`/api/games/sync/status/${task_id}`)
  },
}
