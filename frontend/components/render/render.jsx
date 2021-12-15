import React from 'react'
import { Redirect } from 'react-router'

const Render = ({currentUser}) => {
   const redirect = () => (
        <Redirect to="/welcome" />
       
   )

   const displayHome = () => (
        <div>
          <Redirect to="/home" />
          <button onClick={() => this.props.logoutUser()}>Logout</button>
        </div>
   )

   return currentUser ? displayHome() : redirect()
    
}

export default Render; 