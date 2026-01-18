import { useAuth } from './shared/hooks/useAuth'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import styles from './App.module.css'

function App() {
  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <HomePage user={user} onLogout={logout} />
}

export default App
