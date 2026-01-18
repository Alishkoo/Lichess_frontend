import { useState, useEffect } from 'react'
import { profileService } from '../api/profileService'
import type { ProfileResponse } from '../types'

export function useProfile() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await profileService.getProfile()
      setProfile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  return {
    profile,
    loading,
    error,
    refetch: loadProfile,
  }
}
