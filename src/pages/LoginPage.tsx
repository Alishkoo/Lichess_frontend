import { authService } from '../shared/api/authService'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const handleLogin = () => {
    authService.login()
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Lichess Stats</h1>
        <p className={styles.description}>
          Track your chess performance and analyze your game history
        </p>
        <button onClick={handleLogin} className={styles.button}>
          Sign in with Lichess
        </button>
      </div>
    </div>
  )
}
