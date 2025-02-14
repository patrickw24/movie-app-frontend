import React from 'react'
import { MovieList } from '../Components/MovieList'
import { AddMovieForm } from '../Components/AddMovieForm'

export const MovieScreen = () => {
  return (
    <div>
        <AddMovieForm/>
        <MovieList/>
        </div>
  )
}
