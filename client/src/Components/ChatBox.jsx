import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {

  const {selectedChat, theme, chats, setChats} = useAppcontext()

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
    } else {
      // Project-specific dummy conversation (plain-text PDF scenario)
      const pdfText = `Title: Quarterly Report 2025\n\nExecutive Summary:\nThis document presents the Q2 financial results for Acme Corp. Revenue grew 8% compared to Q1. Net income improved due to cost savings in operations. Key highlights include expansion into two new markets and a successful pilot of the AI-driven recommendation engine.\n\nRevenue Analysis:\nTotal revenue: $5,400,000. Product A: $2,800,000. Product B: $1,900,000. Services: $700,000.\n\nExpenses:\nOperating expenses decreased by 5% year-over-year. Marketing spend remained flat. R&D investment increased by 12% to support product roadmap.\n\nConclusion:\nThe company is on track for annual targets with continued investment in AI capabilities.`

      const sampleConversation = [
        { role: 'user', content: 'I uploaded a PDF: "Quarterly Report 2025" (plain text). Please summarize the executive summary for me.', timestamp: Date.now() - 60000 },
        { role: 'assistant', content: 'Summary: The Q2 financial results show an 8% revenue growth vs Q1. Net income improved due to operational cost savings. Company expanded into two new markets and piloted an AI recommendation engine. R&D investment increased to support roadmap.', timestamp: Date.now() - 45000 },
        { role: 'user', content: 'What was the total revenue and breakdown by product?', timestamp: Date.now() - 30000 },
        { role: 'assistant', content: 'Total revenue: $5,400,000. Breakdown: Product A — $2,800,000; Product B — $1,900,000; Services — $700,000.', timestamp: Date.now() - 15000 },
        { role: 'user', content: 'Were there any notable changes in expenses?', timestamp: Date.now() - 8000 },
        { role: 'assistant', content: 'Operating expenses decreased by 5% YoY. Marketing spend remained flat while R&D increased by 12% to support product development.', timestamp: Date.now() - 2000 },
        // Optionally include the extracted plain text as a system/assistant message for reference
        { role: 'assistant', content: `Extracted text from uploaded PDF:\n\n${pdfText}`, timestamp: Date.now() }
      ];

      setMessages(sampleConversation);

      // Add this sample conversation to global chats (search history) if not already present
      const demoChatId = 'demo-pdf-1'
      const chatObj = {
        _id: demoChatId,
        userId: 'demo-user',
        userName: 'Demo User',
        name: 'Quarterly Report 2025',
        messages: sampleConversation,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      if (!chats || !chats.some(c => c._id === demoChatId)) {
        setChats(prev => [chatObj, ...(prev || [])])
      }
    }
  }, [selectedChat])

  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
      {/* chatMesssages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
        {(messages.length === 0) && (
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
        <div className="relative flex-1 w-full">
          <img 
            src={assets.attachment_icon} 
            alt="Attachment" 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => setShowAttachMenu(v => !v)}
          />
          <input  
            onChange={(e)=>setPrompt(e.target.value)} 
            value={prompt}
            type="text" 
            placeholder="Type your prompt here..." 
            className='pl-12 pr-2 py-2 w-full text-sm outline-none rounded-full bg-transparent' 
            required
          />
        </div>
       
        {showAttachMenu && (
          <div className="absolute left-0 bottom-16 bg-white dark:bg-[#242124] border border-gray-300 dark:border-[#80609F]/30 rounded shadow-lg z-10 min-w-[160px]">
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
        <button type="submit" disabled={loading} className="flex items-center justify-center">
          <img src={loading ? assets.stop_icon : assets.send_icon} className='w-8 cursor-pointer' alt="Send" />
        </button>
      </form>

      
    </div>
  )
}

export default ChatBox
