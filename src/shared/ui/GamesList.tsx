import { useState } from 'react'
import { useGames } from '../hooks/useGames'
import styles from './GamesList.module.css'

export function GamesList() {
  const [perfFilter, setPerfFilter] = useState<string>('')
  const { games, loading, isInitialLoad, isSyncing, error, currentPage, totalPages, nextPage, prevPage } = useGames(10, perfFilter || undefined)

  if (isSyncing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Games History</h2>
          <select 
            value={perfFilter} 
            onChange={(e) => setPerfFilter(e.target.value)}
            className={styles.filter}
          >
            <option value="">All games</option>
            <option value="blitz">Blitz</option>
            <option value="rapid">Rapid</option>
            <option value="classical">Classical</option>
            <option value="bullet">Bullet</option>
            <option value="correspondence">Correspondence</option>
            <option value="ultraBullet">Ultra Bullet</option>
          </select>
        </div>
        <p className={styles.message}>Синхронизация данных с Lichess...</p>
      </div>
    )
  }

  if (isInitialLoad && loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Games History</h2>
        </div>
        <p className={styles.message}>Loading games...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Games History</h2>
          <select 
            value={perfFilter} 
            onChange={(e) => setPerfFilter(e.target.value)}
            className={styles.filter}
          >
            <option value="">All games</option>
            <option value="blitz">Blitz</option>
            <option value="rapid">Rapid</option>
            <option value="classical">Classical</option>
            <option value="bullet">Bullet</option>
            <option value="correspondence">Correspondence</option>
            <option value="ultraBullet">Ultra Bullet</option>
          </select>
        </div>
        <p className={styles.error}>{error}</p>
      </div>
    )
  }

  if (games.length === 0 && !loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Games History</h2>
          <select 
            value={perfFilter} 
            onChange={(e) => setPerfFilter(e.target.value)}
            className={styles.filter}
          >
            <option value="">All games</option>
            <option value="blitz">Blitz</option>
            <option value="rapid">Rapid</option>
            <option value="classical">Classical</option>
            <option value="bullet">Bullet</option>
            <option value="correspondence">Correspondence</option>
            <option value="ultraBullet">Ultra Bullet</option>
          </select>
        </div>
        <p className={styles.message}>No games found</p>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getResultClass = (result: string) => {
    if (result === 'win') return styles.resultWin
    if (result === 'loss') return styles.resultLoss
    return styles.resultDraw
  }

  const getResultText = (result: string) => {
    if (result === 'win') return 'Won'
    if (result === 'loss') return 'Lost'
    return 'Draw'
  }

  const getTerminationText = (termination: string) => {
    const terminationMap: Record<string, string> = {
      'normal': 'Checkmate',
      'time': 'Time out',
      'abandoned': 'Abandoned',
      'cheat': 'Cheat detected',
      'noStart': 'No start',
      'timeout': 'Timeout',
      'draw': 'Draw agreement',
      'stalemate': 'Stalemate',
      'resign': 'Resignation',
    }
    return terminationMap[termination] || termination
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Games History</h2>
        
        <select 
          value={perfFilter} 
          onChange={(e) => setPerfFilter(e.target.value)}
          className={styles.filter}
        >
          <option value="">All games</option>
          <option value="blitz">Blitz</option>
          <option value="rapid">Rapid</option>
          <option value="classical">Classical</option>
          <option value="bullet">Bullet</option>
          <option value="correspondence">Correspondence</option>
          <option value="ultraBullet">Ultra Bullet</option>
        </select>
      </div>
      
      <div className={`${styles.gamesList} ${loading ? styles.gamesListLoading : ''}`}>
        {games.map((game) => (
          <div key={game.id} className={styles.gameItem}>
            <div className={styles.gameHeader}>
              <span className={styles.perfType}>{game.perf_type}</span>
              <span className={styles.date}>{formatDate(game.created_at)}</span>
            </div>
            {game.time_control && (
              <div className={styles.timeControl}>
                Time control: <span>{game.time_control}</span>
              </div>
            )}
            
            <div className={styles.gameInfo}>
              <span className={styles.opponent}>
                vs {game.opponent_name}
                {game.opponent_rating && (
                  <span className={styles.rating}> ({game.opponent_rating})</span>
                )}
              </span>
              <span className={getResultClass(game.result)}>
                {getResultText(game.result)}
              </span>
            </div>

            <div className={styles.gameMiddle}>
              <span className={styles.termination}>
                {getTerminationText(game.termination)}
              </span>
            </div>
            
            <div className={styles.gameFooter}>
              <span className={styles.color}>
                {game.user_color === 'white' ? '⚪' : '⚫'} {game.user_color}
              </span>
              <a 
                href={game.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.link}
              >
                View on Lichess →
              </a>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            ← Previous
          </button>
          <span className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={styles.paginationButton}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
