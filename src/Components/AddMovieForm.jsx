import React from 'react'
import { useState } from 'react'

export const AddMovieForm = () => {

    const [title, setTitle] = useState()
    const [release_year, setRelease_year] = useState()
    const [genre, setGenre] = useState()
    const [duration, setDuration] = useState()
    const [resultOperation, setResult] = useState("")

    const getTitle = (event)=>{
      setTitle(event.target.value)
    }

    const getYear = (event)=>{
      setRelease_year(event.target.value)
    }

    const getGenre = (event)=>{
      setGenre(event.target.value)
    }

    const getDuration = (event)=>{
      setDuration(event.target.value)
    }

    const onSubmitHandler = async ()=>{
        event.preventDefault()
        const token = localStorage.getItem("movie-credential")
      const baseUrl= import.meta.env.VITE_BASE_URL
      const endpoint= "/movie"

      const url = `${baseUrl}${endpoint}`


      const tmp= {
        title,
        release_year,
        genre,
        duration
      }


      const results = await fetch(url,{
        method: 'POST',
          headers: {
            'Authorization': token,
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
          window.location = "/movie"
      }, 5000)
     
    }


  return (
    <>
    <h1 className='display-1 text-center'>Add Movies</h1>
    <div className='container mt-3'>
    <form onSubmit={onSubmitHandler} className='mb-4'>
  <div className="mb-3">
    <label  className="form-label">Title</label>
    <input type="text" onChange={getTitle} className="form-control"/>
    </div>
    <div className="mb-3">
    <label  className="form-label">Release Year</label>
    <input type="number" onChange={getYear} className="form-control"/>
    </div>
    <div className="mb-3">
    <label  className="form-label">Genre</label>
    <input type="text" onChange={getGenre} className="form-control"/>
    </div>
    <div className="mb-3">
    <label  className="form-label">Duration (Minutes)</label>
    <input type="number" onChange={getDuration} className="form-control"/>
    </div>

  <button type="submit" className="btn btn-primary w-100">Submit</button>
</form>
<p className ="text-primary display-4" >{resultOperation}</p>
</div>
    </>
  )
}
