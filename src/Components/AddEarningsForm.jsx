import React from 'react'
import { useState, useEffect } from 'react'

export const AddEarningsForm = () => {

            const [formData, setFormData] = useState({
              movie_id: "",
              country: "",
              revenue: ""
          })

          const [resultOperation, setResult] = useState("")
          

          const baseUrl = import.meta.env.VITE_BASE_URL

          const onChangeHandler = (event) => {
              const property = event.target.name
              const value = event.target.value
              const tmpObject = formData
              tmpObject[property] = value
              setFormData(tmpObject)
}
    
  const [movie, setMovie] = useState([]);

  const getMovies = async () => {
    const token = localStorage.getItem("movie-credential");
    const endpoint = "/movie"
    const url = `${baseUrl}${endpoint}`;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": token,
      },
    });

    const data = await result.json();
    
    
    setMovie(data);
  };
    
        

        const onSubmitHandler = async (event)=>{
            event.preventDefault()
          const baseUrl= import.meta.env.VITE_BASE_URL
          const endpoint= "/earnings"
          const token = localStorage.getItem("movie-credential")
    
          const url = `${baseUrl}${endpoint}`
          

    
          const results = await fetch(url,{
            method: 'POST',
            headers: {
              'Authorization': token,
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
          })

          const data = await results.json()

          if (results.status === 500) {
  
              setResult("Data base error")
  
  
          } else {
  
              
              setResult(data.message)
  
  
          }
  
          setTimeout(() => {
              window.location = "/earnings"
          }, 5000)
  
        }

        useEffect(()=> {
          getMovies()
        }, [])

  return (
    <>
    <h1 className='display-1 text-center'>Add Earnings</h1>
    <div className='container mt-3'>
    <form onSubmit={onSubmitHandler} className='mb-4'>
    <div>
                            <label className="form-label mt-4">Select Movie</label>
                            <select onChange={onChangeHandler} className="form-select" name="movie_id">
                                <option key={0} value={0} > {"Select Movie"} </option>
                                {movie.map((item) => (
                                    <option key={item.movie_id} value={item.movie_id} > {item.title} </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="form-label mt-4">Country</label>
                            <input type="text" name="country" className="form-control" onChange={onChangeHandler} />
                        </div>

                        <div>
                            <label className="form-label mt-4">Revenue</label>
                            <input type="number" name="revenue" className="form-control" onChange={onChangeHandler} />
                        </div>
  <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
</form>
<p className ="text-primary display-4" >{resultOperation}</p>
</div>
    </>
  )
}
