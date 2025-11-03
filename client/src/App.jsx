import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import './assets/prism.css'
import { useAppContext } from './context/AppContext'

const App = () => {

  const { user } = useAppContext()

  



  return (

    <>

    <Routes>
      {/* Public home page shown at '/' */}
      <Route path='/' element={<Home />} />
      {/* Login page explicitly at /login */}
      <Route path='/login' element={<Login />} />
    </Routes>



    
    </>
  )
}

export default App
