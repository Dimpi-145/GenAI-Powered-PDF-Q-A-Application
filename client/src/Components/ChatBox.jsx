import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const {selectedChat, theme} = useAppcontext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)
  // Attachment menu state
  const [showAttachMenu, setShowAttachMenu] = useState(false)

  const onSubmit = async (e)=> {
    e.preventDefault()
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      {/* chatMesssages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {(!selectedChat || messages.length === 0) && (
          <div className='flex flex-col items-center gap-0 text-primary mt-12'>
            <img src={theme === 'dark' ? assets.logo_large : assets.logo_large}
              alt="Logo" className='block mx-auto w-auto max-w-80 sm:max-w-96 align-top' style={{marginBottom: 0, paddingBottom: 0}} />
            <p className='mt- mb-0 leading-none text-3xl sm:text-6xl text-center text-gray-400 dark:text-white' style={{marginTop: 0, paddingTop: 0}}>Ask me anything.</p>
          </div>
        )}
        {messages.map((message, index)=><Message key={index} message={message} />)}
      </div>
      {/* prompt Tnput Box */}
      <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full
      max-w-2xl p-3 mx-auto flex gap-4 items-center relative'>
        <input  onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type your prompt here..." className='flex-1 w-full text-sm outline-none' required/>
        {/* Attachment Icon and Dropdown (single instance) */}
        <div className="relative ml-2">
          <button type="button" onClick={() => setShowAttachMenu(v => !v)} className="flex items-center justify-center">
            <img src={assets.gallery_icon} className='w-8' alt="Attachment" />
          </button>
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 bg-white dark:bg-[#242124] border border-gray-300 dark:border-[#80609F]/30 rounded shadow-lg z-10 min-w-[160px]">
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20">
                Upload PDF
                <input type="file" accept="application/pdf" className="hidden" onChange={e => {/* handle PDF upload */}} />
              </label>
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20">
                Browse
                <input type="file" className="hidden" onChange={e => {/* handle browse upload */}} />
              </label>
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20">
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={e => {/* handle image upload */}} />
              </label>
            </div>
          )}
        </div>
        <button type="submit" disabled={loading} className="flex items-center justify-center">
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="Send" />
        </button>
        {/* Additional Attachment Icon and Dropdown */}
        <div className="relative ml-2">
          <button type="button" onClick={() => setShowAttachMenu(v => !v)} className="flex items-center justify-center">
            <img src={assets.gallery_icon} className='w-8' alt="Attachment" />
          </button>
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 bg-white dark:bg-[#242124] border border-gray-300 dark:border-[#80609F]/30 rounded shadow-lg z-10 min-w-[160px]">
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20">
                Upload PDF
                <input type="file" accept="application/pdf" className="hidden" onChange={e => {/* handle PDF upload */}} />
              </label>
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20">
                Browse
                <input type="file" className="hidden" onChange={e => {/* handle browse upload */}} />
              </label>
              <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/20">
                Upload Image
                <input type="file" accept="image/*" className="hidden" onChange={e => {/* handle image upload */}} />
              </label>
            </div>
          )}
        </div>
      </form>

      
    </div>
  )
}

export default ChatBox
