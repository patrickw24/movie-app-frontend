import React from 'react'
import { useState, useEffect } from 'react'


export const EarningsList = () => {

    const [resultOperation, setResult] = useState("")
   

 const baseUrl= import.meta.env.VITE_BASE_URL
        const endpoint= "/earnings"

        const [earnings, setEarnings] = useState([])
        
        const getEarnings = async () => {

            const url =`${baseUrl}${endpoint}`
           
            const token = localStorage.getItem("movie-credential")
            const result= await fetch(url,{
                method: 'GET',
                headers: {
                    'Authorization': token
                }
            })
            
            const data= await result.json()
           
            setEarnings(data)
            
        }
       

        const deleteEarnings = async (movie_id)=>{
            const id= `${endpoint}/${movie_id}`
            const token = localStorage.getItem("movie-credential")
            const url=`${baseUrl}${id}`
            const response= await fetch(url,{
               method: "DELETE",
               headers: {
                'Authorization': token
               }
            })
            getEarnings()
        
            const data = await response.json()
            if (response.status === 500) {

                setResult("Data base error")
      
      
            } else {
      
                
                setResult(data.message)
      
      
            }

            setTimeout(() => {
                window.location = "/earnings";
              }, 5000);
           
        }
       

        useEffect(()=>{
          getEarnings()
        }, [])

      

  return (
    <>
    
    <table className='table'>
        <thead>
            <tr>
                <th>Movie ID</th>
                <th>Title</th>
                <th>Country</th>
                <th>Revenue (Thousand)</th>
            </tr>
        </thead>
        <tbody>
            {earnings.map((item)=>(
                <tr key= {item.movie_id}>
                    <td>{item.movie_id}</td>
                    <td>{item.title}</td>
                    <td>{item.country}</td>
                    <td>{item.revenue}</td>
                    <td><button className="btn btn-warning" onClick={() => {
                    deleteEarnings(item.movie_id);
                  }}> Delete
                        </button> </td>
                </tr>
            ))
            
            }
        </tbody>

    </table>
    <p className ="text-primary display-4" >{resultOperation}</p>


</>
  )
}
