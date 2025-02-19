import React from 'react'
import { useState, useEffect } from 'react'

export const EarningsList = () => {

 const baseUrl= import.meta.env.VITE_BASE_URL
        const endpoint= "/earnings"

        const [earnings, setEarnings] = useState([])
        
        const getEarnings = async () => {
            const url =`${baseUrl}${endpoint}`
            const result= await fetch(url,{
                method: 'GET'
            })
            
            const data= await result.json()
            console.log(url)
            console.log(data)
            setEarnings(data)
            
        }
       

        const deleteEarnings = async (movie_id)=>{
            const id= `${endpoint}/${movie_id}`
            const url=`${baseUrl}${id}`
            const result= await fetch(url,{
               method: "DELETE" 
            })
            getEarnings()
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
                <th>Country</th>
                <th>Revenue (Thousand)</th>
            </tr>
        </thead>
        <tbody>
            {earnings.map((item)=>(
                <tr key= {item.earnings_id}>
                    <td>{item.movie_id}</td>
                    <td>{item.country}</td>
                    <td>{item.revenue}</td>
                    <td><button className="btn btn-warning" onClick={()=>{deleteEarnings(item.earnings_id)}}> Delete
                        </button> </td>
                </tr>
            ))
            
            }
        </tbody>

    </table>

</>
  )
}
