import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import { ActorScreen } from './ScreenComponents/ActorScreen'
import { Earnings } from './ScreenComponents/Earnings'
import { MovieScreen } from './ScreenComponents/MovieScreen'
import { LogIn } from './ScreenComponents/LogIn'
import { Menu } from './Components/Menu'
import { Register } from './ScreenComponents/Register'




function App() {

  const [isLogIn , setIsLogIn] = useState(false)
  

  let token = ""
  const baseUrl = import.meta.env.VITE_BASE_URL
  const endPoint = "/validateSesion"

  const validateToken = async()=>{
      const newUrl = `${baseUrl}${endPoint}`


      try{
        const result = await fetch(newUrl, {
        method: "POST", 
        headers: {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
      })

      if (result.ok) {
        setIsLogIn(true)  
      } else {
        setIsLogIn(false)  
        window.location.href = "/"
      }
    }catch{
      setIsLogIn(false)
        window.location.href="/"
    }
     


  }

 

  useEffect(()=>{

    token = window.localStorage.getItem('movie-credential')
    validateToken()

  }, [])



  return (
    <>
        <BrowserRouter>
        {isLogIn && <Menu />}
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          
          {isLogIn ? (
            <>
              <Route path="/movie" element={<MovieScreen />} />
              <Route path="/actor" element={<ActorScreen />} />
              <Route path="/earnings" element={<Earnings />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
