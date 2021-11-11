import React from 'react'
import { Redirect } from 'react-router'

const Render = ({currentUser}) => {
   const redirect = () => (
        <Redirect to="/starthere" />
       
   )

   const displayHome = () => (
        <div>
          <Redirect to="/home" />
          <button onClick={() => this.props.logoutUser()}>Logout</button>
        </div>
   )

   return currentUser ? redirect() : displayHome()
    
}

export default Render; 