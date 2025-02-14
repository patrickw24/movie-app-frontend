import React from 'react'
import { useState } from 'react'

export const AddMovieForm = () => {

    const [title, setTitle] = useState()
    const [release_year, setRelease_year] = useState()
    const [genre, setGenre] = useState()
    const [duration, setDuration] = useState()

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
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(tmp)
      })


     
    }


  return (
    <>
    <form onSubmit={onSubmitHandler}>
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
    <label  className="form-label">Duration</label>
    <input type="text" onChange={getDuration} className="form-control"/>
    </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}
