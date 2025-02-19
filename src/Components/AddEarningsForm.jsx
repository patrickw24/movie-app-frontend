import React from 'react'
import { useState } from 'react'

export const AddEarningsForm = () => {

     const [movie_id, setMovie_id] = useState()
        const [country, setCountry] = useState()
        const [revenue, setRevenue] = useState()
        const [resultOperation, setResult] = useState("")
        
    
        const getMovieID = (event)=>{
            setMovie_id(event.target.value)
        }
    
        const getCountry = (event)=>{
            setCountry(event.target.value)
        }
    
        const getRevenue = (event)=>{
            setRevenue(event.target.value)
        }
    
    
        const onSubmitHandler = async ()=>{
            event.preventDefault()
          const baseUrl= import.meta.env.VITE_BASE_URL
          const endpoint= "/earnings"
    
          const url = `${baseUrl}${endpoint}`
    
    
          const tmp= {
            movie_id,
            country,
            revenue
          }
    
    
          const results = await fetch(url,{
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(tmp)
          })

          const data = await results.json()

          if (results.status === 500) {
  
              setResult("Data base error")
  
  
          } else {
  
              console.log(data.message)
              setResult(data.message)
  
  
          }
  
          setTimeout(() => {
              window.location = "/earnings"
          }, 5000)
  
        }

  return (
    <>
    <h1 className='display-1 text-center'>Add Earnings</h1>
    <div className='container mt-3'>
    <form onSubmit={onSubmitHandler} className='mb-4'>
  <div className="mb-3">
    <label  className="form-label">Movie ID</label>
    <input type="number" onChange={getMovieID} className="form-control"/>
    </div>
    <div className="mb-3">
    <label  className="form-label">Country</label>
    <input type="text" onChange={getCountry} className="form-control"/>
    </div>
    <div className="mb-3">
    <label  className="form-label">Revenue</label>
    <input type="text" onChange={getRevenue} className="form-control"/>
    </div>
  <button type="submit" className="btn btn-primary w-100">Submit</button>
</form>
<p className ="text-primary display-4" >{resultOperation}</p>
</div>
    </>
  )
}
