import { useState, useEffect, useRef } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  const userRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  return (
    <>
      <div className='login'>
        <h1>LOGIN</h1>
        <form method='post'>
          <label>
            <p>Username</p>
            <input type="text" onChange={(e) => setUsername(e.target.value)} ref={userRef}/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </label>
          
          <div>
            <button className='submit' type="submit">Submit</button>
          </div>
        </form>
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
