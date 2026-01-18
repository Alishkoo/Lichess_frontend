import { useProfile } from '../shared/hooks/useProfile'
import { GamesList } from '../shared/ui/GamesList'
import type { UserResponse } from '../shared/types'
import styles from './HomePage.module.css'

interface HomePageProps {
  user: UserResponse
  onLogout: () => void
}

export function HomePage({ user, onLogout }: HomePageProps) {
  const { profile, loading, error } = useProfile()

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.subtitle}>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome, {user.username}!</h1>
          <p className={styles.error}>{error || 'Failed to load profile'}</p>
          <button onClick={onLogout} className={styles.button}>
            Sign out
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const mainRatings = ['blitz', 'rapid', 'classical']

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {profile.avatar && (
          <img src={profile.avatar} alt={profile.username} className={styles.avatar} />
        )}
        
        <h1 className={styles.title}>Welcome, {profile.username}!</h1>
        
        <a 
          href={profile.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.link}
        >
          View on Lichess
        </a>

    

        <div className={styles.ratings}>
          <h2 className={styles.ratingsTitle}>Ratings</h2>
          {mainRatings.map((type) => {
            const rating = profile.ratings[type]
            if (!rating) return null
            
            return (
              <div key={type} className={styles.ratingItem}>
                <span className={styles.ratingType}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <span className={styles.ratingValue}>{rating.rating}</span>
                <span className={styles.ratingGames}>({rating.games} games)</span>
              </div>
            )
          })}
        </div>

         <button onClick={onLogout} className={styles.button}>
          Sign out
        </button>

        <div className={styles.info}>
          <p className={styles.infoText}>
            Joined: {formatDate(profile.createdAt)}
          </p>
          <p className={styles.infoText}>
            Last seen: {formatDate(profile.seenAt)}
          </p>
        </div>


        <GamesList />
      </div>
    </div>
  )
}
