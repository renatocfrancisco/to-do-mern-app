import React from 'react'
import Layout from './components/layout'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/login'
import Home from './pages/home/home'

function App () {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
