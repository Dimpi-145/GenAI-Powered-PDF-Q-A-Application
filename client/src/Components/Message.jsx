import React from 'react'
import { assets } from '../assets/assets'

const Message = ({ message }) => {
  const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : '';

  if (message.role === 'assistant') {
    return (
      <div className='flex items-start justify-start my-4 gap-3'>
        <img src={assets.logo_large} alt="AI" className='w-8 h-8 rounded-full object-cover' />
        <div className='flex flex-col gap-2 p-3 px-4 bg-white dark:bg-[#2b1f3b] border border-gray-200 dark:border-[#44304f] rounded-md max-w-2xl'>
          {message.isImage ? (
            <img src={message.content} alt='generated' className='max-w-xs rounded-md' />
          ) : (
            <p className='text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap'>{message.content}</p>
          )}
          <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{time}</span>
        </div>
      </div>
    )
  }

  // default to user message
  return (
    <div className='flex items-start justify-end my-4 gap-3'>
      <div className='flex flex-col gap-2 p-3 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
        {message.isImage ? (
          <img src={message.content} alt='user-upload' className='max-w-xs rounded-md' />
        ) : (
          <p className='text-sm text-gray-900 dark:text-white whitespace-pre-wrap'>{message.content}</p>
        )}
        <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{time}</span>
      </div>
      <img src={assets.user_icon} alt="User" className='w-8 h-8 rounded-full object-cover' />
    </div>
  )
}

export default Message
