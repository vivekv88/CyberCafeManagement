import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
