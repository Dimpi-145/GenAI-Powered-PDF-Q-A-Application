import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import ChatBox from './Components/ChatBox'
import { assets } from './assets/assets'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000]
    dark:text-white'>
      {/* Mobile menu icon */}
      {!isMenuOpen && (
        <img 
          src={assets.menu_icon} 
          className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'
          onClick={() => setIsMenuOpen(true)}
          alt="Open menu"
        />
      )}
      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
          <Route path='/' element={<ChatBox />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
