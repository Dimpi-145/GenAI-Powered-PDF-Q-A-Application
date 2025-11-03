import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import { assets } from '../assets/assets'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      {!isMenuOpen && (
        <img src={assets.menu_icon} className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={() => setIsMenuOpen(true)} />
      )}

      <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <ChatBox />
      </div>
    </div>
  )
}

export default Home
