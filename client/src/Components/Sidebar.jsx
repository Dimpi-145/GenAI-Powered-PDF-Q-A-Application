import React, { useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const Sidebar = () => {

  const {chats, setSelectedChat, theme, setTheme, user}= useAppcontext()
    const [search, setSearch]= useState('')

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    };

  return (
    <div className='flex-col h-screen min-w-72 p-1 dark:bg-gradient-to-b from-[#242124]/30 to-[#00000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl
    transition-all duration-500 max-md:absolute left-0 z-1'>
        <img 
          src={theme === 'dark' ? assets.logo_large : assets.logo_large}
          alt="Logo" 
          className='w-full max-w-72'
          style={{ position: 'absolute', top: -40, left: -10, width: '380px', height: 'auto' }}
        />
        <button 
          className='flex items-center justify-center w-7/7 p-3 mt-20 mx-auto text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-base rounded-lg shadow-md cursor-pointer'
          style={{ display: 'block' }}
        >
          <span className='mr-2 text-xl'>+</span> New Chat
        </button>

        <div className='relative flex items-center p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md bg-white dark:bg-[#242124]/30'>
          <span className='absolute left-4'>
            <img src={assets.search_icon} className='w-5 h-5 dark:invert' alt="Search" />
          </span>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder='Search conversations'
            className='pl-10 pr-2 py-2 w-full text-base placeholder:text-gray-400 outline-none bg-transparent'
          />
        </div>
            {chats.length >0 && <p className='mt-8 text-xl font-bold'>Recent Chats</p>}
        <div>
         {
            chats.filter((chat)=> chat.messages[0]? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()): 
            chat.name.toLowerCase().includes(search.toLowerCase())).map((chat, idx)=>(
              <div key={chat._id || idx} className='p-2 px-3 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group mb-4'>
                <div>
                  <p className='truncate w-full'>
                    {chat.messages.length > 0 ? chat.messages[0].content.slice(0,32) : chat.name}
                  </p>
                  <p className='text-s text-gray-500 dark:text-[#B1A6C0]'>
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>  
                <img src={assets.bin_icon} className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' alt=""/>
              </div>
            ))
        }
        </div>
        <div className='flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 
        rounded-md '>
          <div className='flex items-center gap-2 text-sm'>
            <img src={assets.theme_icon} className='w-4 dark:invert' alt=""/>
            <p>dark Mode</p>
          </div>
          <label className='relative inline-flex cursor-pointer'>
            <input onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className="sr-only peer" checked={theme === 'dark'}/>
            <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'>
            </div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform
            peer-checked:translate-x-4'></span>
          </label>
        </div>
    </div>
   
  )
}

export default Sidebar
