import { useState, useEffect } from 'react'
import { authService } from '../api/authService'
import type { UserResponse } from '../types'

export function useAuth() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const checkAuth = async () => {
    try {
      setLoading(true)
      setError(null)
      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch (err) {
      setUser(null)
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const login = () => {
    authService.login()
  }

  const logout = async () => {
    try {
      setLoading(true)
      await authService.logout()
      setUser(null)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
  }
}
