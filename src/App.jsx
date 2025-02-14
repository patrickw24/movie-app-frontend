import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ActorScreen } from './ScreenComponents/ActorScreen'
import { Earnings } from './ScreenComponents/Earnings'
import { MovieScreen } from './ScreenComponents/MovieScreen'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MovieScreen/>}/> 
      <Route path="/actors" element={<ActorScreen/>}/> 
      <Route path="/earnings" element={<Earnings/>}/> 
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
