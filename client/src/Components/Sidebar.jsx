import React, { useState } from 'react'
import { useAppcontext } from '../context/AppContext'

const Sidebar = () => {

    const {chats, setSelectedChat, theme, setTheme, user}= useAppcontext()
    const [search, setSearch]= useState('')

  return (
    <div className='flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#00000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl
    transition-all duration-500 max-md:absolute left-0 z-1'>
      <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
       alt="" className='w-full max-w-48'/>
    </div>
  )
}

export default Sidebar
