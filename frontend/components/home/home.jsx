import React from 'react'
import ChannelsIndexContainer from './sidebar/channels/channels_index_container'
import UsersIndexContainer from '.././home/sidebar/users/users_index_container'

class Home extends React.Component{
   constructor(props){
      super(props)
   }

   render(){
      return (
         <div> 
            
            <UsersIndexContainer /> 
            <ChannelsIndexContainer />    
            <button onClick={() => this.props.logoutUser()}>Logout</button> 
            

            {/* // <RenderMessagesContainer /> 
            // <SidebarContainer />  */}
         </div>
      )
   }
} 

export default Home; 