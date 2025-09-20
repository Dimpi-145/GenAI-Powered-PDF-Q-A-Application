import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import ChatBox from './Components/ChatBox'
import { assets } from './assets/assets'
import { useAppcontext } from './context/AppContext'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage' 

const App = () => {
  const { user } = useAppcontext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'
          onClick={() => setIsMenuOpen(true)}
          alt="Open menu"
        />
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
  <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
  <Route path="/HomePage" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </>
  )
}

export default App