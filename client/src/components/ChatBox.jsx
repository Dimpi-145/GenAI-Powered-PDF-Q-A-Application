import React, { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Messages from './Messages'

const ChatBox = () => {


  const {selectedChat, theme, setSelectedChat, setChats, createNewChat} = useAppContext()

  const [messages, setMessages] = useState([])

  const [loading, setLoading ]= useState(false)


  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isPublished, setIsPublished] = useState(false)
  const messagesEndRef = useRef(null)

  const onSubmit = async (e) => {
    e.preventDefault()

    // ensure we have a chat to append to
    let currentChat = selectedChat
    if (!currentChat) {
      // create a new chat and use it
      currentChat = createNewChat ? createNewChat() : {
        _id: Date.now().toString(),
        name: 'New Chat',
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    if (mode === 'file' && selectedFile) {
      const message = {
        role: 'user',
        content: selectedFile.name,
        file: selectedFile,
        isImage: false,
        isPublished: false,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, message])

      const updated = { ...currentChat, messages: [...(currentChat.messages || []), message], updatedAt: new Date() }
      setSelectedChat(updated)
      setChats(prev => prev.map(c => c._id === updated._id ? updated : c))

      // reset file state
      setSelectedFile(null)
      setMode('text')
        // simulate assistant reply for file
        setTimeout(() => {
          const assistantMsg = {
            role: 'assistant',
            content: `Received file: ${message.content}`,
            isImage: false,
            isPublished: false,
            timestamp: Date.now()
          }
          setMessages(prev => [...prev, assistantMsg])
          const updated2 = { ...updated, messages: [...(updated.messages || []), assistantMsg], updatedAt: new Date() }
          setSelectedChat(updated2)
          setChats(prev => prev.map(c => c._id === updated2._id ? updated2 : c))
        }, 700)
        return
    }

    const text = prompt.trim()
    if (!text) return

    const message = {
      role: 'user',
      content: text,
      isImage: false,
      isPublished: false,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, message])

    const updated = { ...currentChat, messages: [...(currentChat.messages || []), message], updatedAt: new Date() }
    setSelectedChat(updated)
    setChats(prev => prev.map(c => c._id === updated._id ? updated : c))

    setPrompt('')
    // simulate assistant reply
    setTimeout(() => {
      const assistantMsg = {
        role: 'assistant',
        content: `I received: ${text}`,
        isImage: false,
        isPublished: false,
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, assistantMsg])
      const updated2 = { ...updated, messages: [...(updated.messages || []), assistantMsg], updatedAt: new Date() }
      setSelectedChat(updated2)
      setChats(prev => prev.map(c => c._id === updated2._id ? updated2 : c))
    }, 700)
  }


  useEffect(()=> {
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  // scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])


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
  <div ref={messagesEndRef} />

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
                setSelectedFile(file);
              }
            }}
          />
          <img src={assets.attachment_icon} alt="Attach file" className='w-6 h-6' />
        </label>
        <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type="text" placeholder="Type your message here..." className='flex-1 w-full text-sm outline-none' required={!selectedFile}/>
        <button disabled={loading}>
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt=""/>
        </button>
      </form>

      
    </div>
  )
}

export default ChatBox
