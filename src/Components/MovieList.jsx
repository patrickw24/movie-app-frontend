import React from 'react'
import { useState, useEffect } from 'react'

export const MovieList = () => {

        const baseUrl= import.meta.env.VITE_BASE_URL
        const endpoint= "/movie"

        const [movie, setMovie] = useState([])
        
        const getMovies = async () => {
            const url =`${baseUrl}${endpoint}`
            const result= await fetch(url,{
                method: 'GET'
            })
            const data= await result.json()
            setMovie(data)
            
        }
       

        const deleteMovies = async (movie_id)=>{
            const url=`${baseUrl}${endpoint}`
            const result= await fetch(url,{
               method: "DELETE" 
            })
            getMovies()
        }

        useEffect(()=>{
            getMovies()
        }, [])


  return (
    <>
    
        <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Year</th>
                    <th>Genre</th>
                    <th>Duration (minutes)</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {movie.map((item)=>{
                    <tr key= {item.movie_id}>
                        <td>{item.title}</td>
                        <td>{item.release_year}</td>
                        <td>{item.genre}</td>
                        <td>{item.duration}</td>
                        <td><button class="btn btn-warning" onClick={()=>{deleteMovies(item.movie_id)}}> Delete
                            </button> </td>
                    </tr>
                })
                
                }
            </tbody>

        </table>
    
    </>
  )
}
