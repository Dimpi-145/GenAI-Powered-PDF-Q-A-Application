import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import RegistrationPage from './Pages/RegistrationPage'

const App = () => {
  return (
    <div className='bg-gradient-to-b from-teal-50 to-orange-50'>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
      </Routes>
    </div>
  )
}

export default App
