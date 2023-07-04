import { login, setRefreshToken, setToken } from '../../api'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import BarSpinner from '../../assets/spinner'
import styles from './login.module.css'

export default function Login () {
  const userRef = useRef()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await login(username, password)
    if (result.status === 200) {
      setToken(result.data.accessToken)
      setRefreshToken(result.data.refreshToken)
      navigate('/home')
    } else {
      alert(result)
    }
    setLoading(false)
  }

  useEffect(() => {
    userRef.current.focus()
  }, [])

  return (
    <>
      <div className={styles.login}>
        <h1>LOGIN</h1>
        <form>
          <label className={styles.label}>
            <p>Username</p>
            <input
              type="text"
              className={styles.input}
              disabled={loading}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              ref={userRef}
            />
          </label>
          <label className={styles.label}>
            <p>Password</p>
            <input
              type="password"
              className={styles.input}
              disabled={loading}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {loading
            ? (
            <div>
              <BarSpinner />
            </div>
              )
            : (
            <div className={styles.submitButton}>
              <button onClick={handleSubmit}>Submit</button>
            </div>
              )}
        </form>
      </div>
    </>
  )
}
