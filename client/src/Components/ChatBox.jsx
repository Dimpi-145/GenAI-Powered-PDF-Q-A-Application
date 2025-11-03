import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Messages from './Messages'

const ChatBox = () => {


  const {selectedChat, theme} = useAppContext()

  const [messages, setMessages] = useState([])

  const [loading, setLoading ]= useState(false)


  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
  }


  useEffect(()=> {
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])


  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>

      {/* chat messages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img src={theme === 'dark' ? assets.logo_large : assets.logo_large} alt="" className='w-full max-w-56 sm:max-w-68'/>
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>Ask me anything.</p>
            </div>
        )}


        {messages.map((message, index)=> <Messages key={index} message={message} />)}

      </div>


      {/* Prompt input box */}
  <form onSubmit={onSubmit} className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 max-auto flex gap-4 items-center lg:ml-10 xl:ml-25'>
        <label className='cursor-pointer'>
          <input 
            type="file" 
            className='hidden' 
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setMode('file');
                setPrompt(file.name);
              }
            }}
          />
          <img src={assets.attachment_icon} alt="Attach file" className='w-6 h-6' />
        </label>
        <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type your message here..." className='flex-1 w-full text-sm outline-none' required/>
        <button disabled={loading}>
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt=""/>
        </button>
      </form>

      
    </div>
  )
}

export default ChatBox
