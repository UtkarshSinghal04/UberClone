import React from 'react'
import { Route, Routes } from 'react-router-dom'

//pages 
import Home from './Pages/Home'
import UserRegister from './Pages/UserRegister'
import UserLogin from './Pages/UserLogin'
import CaptainLogin from './Pages/CaptainLogin'
import CaptainRegister from './Pages/CaptainRegister'
import Start from './Pages/Start'
import UserProtectedWrapper from './Pages/UserProtectedWrapper'
import UserLogout from './Pages/UserLogout'
import CaptainProtectedWrapper from './Pages/CaptainProtectedWrapper'
import CaptainHome from './Pages/CaptainHome'
import CaptainLogout from './Pages/CaptainLogout'
import Riding from './Pages/Riding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Start />}></Route>
        <Route path='/login' element={<UserLogin />}></Route>
        <Route path='/signup' element={<UserRegister />}></Route>
        <Route path='/captain-login' element={<CaptainLogin />}></Route>
        <Route path='/captain-signup' element={<CaptainRegister />}></Route>
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>}></Route>
        <Route path='/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>}></Route>
        <Route path='/riding' element={
          <UserProtectedWrapper>
            <Riding />
          </UserProtectedWrapper>}></Route>
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        }></Route>
        <Route path='/captain-logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        }></Route>
      </Routes>
    </div>
  )
}

export default App
