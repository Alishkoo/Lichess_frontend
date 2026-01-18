import { apiClient } from './client'
import type { ProfileResponse } from '../types'

export const profileService = {
  async getProfile(): Promise<ProfileResponse> {
    return apiClient.get<ProfileResponse>('/api/profile')
  },
}
