import React from 'react'
import { useState, useEffect } from 'react'

export const ActorList = () => {

    const baseUrl= import.meta.env.VITE_BASE_URL
          const endpoint= "/actor"
  
      const [actor, setActor] = useState([])
  
      const getActors = async () => {
        const url =`${baseUrl}${endpoint}`
        const result= await fetch(url,{
            method: 'GET'
        })
        
        const data= await result.json()
        console.log(url)
        console.log(data)
        setActor(data)
        
    }

            const deleteActor = async (actor_id)=>{
                const id= `${endpoint}/${actor_id}`
                const url=`${baseUrl}${id}`
                const result= await fetch(url,{
                   method: "DELETE" 
                })
                getActors()
            }
    
            useEffect(()=>{
              getActors()
            }, [])
  
  return (
    <>
            <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>
                {actor.map((item)=>(
                    <tr key= {item.actor_id}>
                        <td>{item.name}</td>
                        <td>{item.date_of_birth}</td>
                        <td>{item.nationality}</td>
                        <td><button className="btn btn-warning" onClick={()=>{deleteActor(item.actor_id)}}> Delete
                            </button> </td>
                    </tr>
                ))
                
                }
            </tbody>

        </table>
    
    </>
  )
    
}
