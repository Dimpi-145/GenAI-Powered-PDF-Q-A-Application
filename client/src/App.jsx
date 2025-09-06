import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import ChatBox from './Components/ChatBox'

const App = () => {
  return (
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000]
    dark:text-white'>
    <div className= 'flex h-screen w-screen'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<ChatBox />}/>
        
      </Routes>
    </div>
    </div>
  )
}

export default App
