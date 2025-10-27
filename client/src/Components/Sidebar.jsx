import React, { useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats = [], setChats, selectedChat, setSelectedChat, theme, setTheme, user, setUser, navigate } = useAppcontext()
  const [search, setSearch] = useState('')

  return (
    <div
      className={`flex flex-col h-screen min-w-72 p-2 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl transition-all duration-500 overflow-hidden
        max-md:fixed max-md:top-0 max-md:left-0 max-md:w-full max-md:h-full max-md:z-50
        ${theme === 'dark' ? 'max-md:bg-[#242124]/95' : 'max-md:bg-white'}
        ${isMenuOpen ? '' : 'hidden md:block'}`}
    >
      {/* Scrollable content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pb-28">
        <div className='w-full flex justify-center mt-4 mb-2'>
          <img src={assets.logo_large} alt="Logo" className='w-36 md:w-48 h-auto object-contain' />
        </div>

        <button
          className='flex items-center justify-center w-full p-3 mt-2 mx-auto text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-base rounded-lg shadow-md cursor-pointer'
          onClick={() => {
            // create a fresh empty chat and select it so ChatBox shows an empty conversation
            const newChat = {
              _id: `chat-${Date.now()}`,
              userId: user?.email || 'local',
              userName: user?.name || 'You',
              name: 'New Chat',
              messages: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
            // prepend to chats
            if (typeof setChats === 'function') setChats(prev => [newChat, ...(prev || [])])
            if (typeof setSelectedChat === 'function') setSelectedChat(newChat)
            if (typeof navigate === 'function') navigate('/')
          }}
        >
          <span className='mr-2 text-xl'>+</span> New Chat
        </button>

        <div className='relative flex items-center p-3 mt-3 border border-gray-400 dark:border-white/20 rounded-md bg-white dark:bg-[#242124]/30'>
          <span className='absolute left-2'>
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

        {chats.length > 0 && <p className='mt-6 mb-2 text-xl font-bold px-1'>Recent Chats</p>}

        <div className='px-1 pb-4'>
          {chats
            .filter((chat) => {
              try {
                const primary = chat.messages && chat.messages.length > 0 ? chat.messages[0].content : chat.name
                return primary.toLowerCase().includes(search.toLowerCase()) || chat.name.toLowerCase().includes(search.toLowerCase())
              } catch (e) {
                return true
              }
            })
            .map((chat) => (
              <div
                key={chat._id}
                className='p-2 px-3 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group mb-3'
                onClick={() => {
                  setSelectedChat(chat)
                  if (typeof setIsMenuOpen === 'function') setIsMenuOpen(false)
                  if (typeof navigate === 'function') navigate('/')
                }}
              >
                <div>
                  <p className='truncate w-44'>{chat.messages && chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}</p>
                  <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                    {chat.updatedAt ? moment(chat.updatedAt).fromNow() : ''}
                  </p>
                </div>
                <img src={assets.bin_icon} className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' alt="" />
              </div>
            ))}
        </div>
      </div>

      {/* Sticky bottom controls */}
      <div className='sticky bottom-0 bg-transparent px-3 py-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-2 p-3 border border-gray-300 dark:border-white/15 rounded-md bg-white dark:bg-[#1f1726]'>
            <div className='flex items-center gap-2 text-sm'>
              <img src={assets.theme_icon} className='w-4 dark:invert' alt="" />
              <p className='text-sm'>Dark Mode</p>
            </div>
            <label className='relative inline-flex cursor-pointer'>
              <input onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} type='checkbox' className='sr-only peer' checked={theme === 'dark'} />
              <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'></div>
              <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
            </label>
          </div>

          <div className='flex items-center gap-3 p-3 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer bg-white dark:bg-[#1f1726]'>
            <img src={assets.user_icon} className='w-8 h-8 rounded-full' alt="" />
            <p className='flex-1 text-sm dark:text-primary truncate'>{user && user.name ? user.name.replace(/greatstack/gi, 'User').trim() : 'Login your account'}</p>
            {user && <img src={assets.logout_icon} className='h-10 cursor-pointer hidden not-dark:invert group-hover:block' alt="" />}
          </div>
        </div>
      </div>
    </div>
  )
}

  export default Sidebar


