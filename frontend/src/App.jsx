import React from 'react'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import UserTable from './components/Users'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/users' element={<UserTable />} />
      </Routes>
    </>
  )
}

export default App
