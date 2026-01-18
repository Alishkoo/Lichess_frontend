import { useState, useEffect } from 'react'
import { gamesService } from '../api/gamesService'
import type { GamesListResponse } from '../types'

export function useGames(limit: number = 20, perfType?: string) {
  const [data, setData] = useState<GamesListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const loadGames = async (page: number) => {
    try {
      setLoading(true)
      setError(null)
      const response = await gamesService.getGames(page, limit, perfType)
      setData(response)
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load games')
    } finally {
      setLoading(false)
      setIsInitialLoad(false)
    }
  }

  const nextPage = () => {
    if (data && currentPage < data.pages) {
      loadGames(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      loadGames(currentPage - 1)
    }
  }

  const goToPage = (page: number) => {
    if (data && page >= 1 && page <= data.pages) {
      loadGames(page)
    }
  }

  useEffect(() => {
    loadGames(1)
  }, [perfType])

  return {
    games: data?.items || [],
    total: data?.total || 0,
    currentPage,
    totalPages: data?.pages || 0,
    loading,
    isInitialLoad,
    error,
    nextPage,
    prevPage,
    goToPage,
    refetch: () => loadGames(currentPage),
  }
}
