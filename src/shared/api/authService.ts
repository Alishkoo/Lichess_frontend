import { apiClient } from './client'
import { API_BASE_URL } from '../config'
import type { UserResponse } from '../types'

export const authService = {
  login() {
    window.location.href = `${API_BASE_URL}/auth/login`
  },

  async getCurrentUser(): Promise<UserResponse> {
    return apiClient.get<UserResponse>('/auth/me')
  },

  async logout(): Promise<void> {
    await apiClient.post<void>('/auth/logout')
  },
}
