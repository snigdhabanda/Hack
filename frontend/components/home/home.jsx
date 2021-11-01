import React from 'react'
import MessageFormContainer from './message_form/message_form_container'
// import {RenderMessagesContainer}
// import {SidebarContainer}

class Home extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      return (
         <div> 
            <button onClick={() => this.props.logoutUser()}>Logout</button>
             <MessageFormContainer />
            {/* // <RenderMessagesContainer /> 
            // <SidebarContainer />  */}
         </div>
      )
   }
} 

export default Home; 