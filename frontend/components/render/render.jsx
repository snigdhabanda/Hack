import React from 'react'
import { Redirect } from 'react-router'

const Render = ({currentUser}) => {
   const redirect = () => (
        <Redirect to="/starthere" />
   )

   const displayHome = () => (
        <Redirect to="/home" />
   )

   return currentUser ? redirect() : displayHome()
    
}

export default Render; 