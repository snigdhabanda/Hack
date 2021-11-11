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
            <nav className="header-nav">
               {/* UserComponent */}
               {/* SearchBar */}
               Search goes here
            </nav>
            <nav className="sidebar-nav" >
               <div className="dinner-party">Dinner Party</div>
               <UsersIndexContainer /> 
               <ChannelsIndexContainer />  
            </nav>  
            <button onClick={() => this.props.logoutUser()}>Logout</button> 
            

            {/* // <RenderMessagesContainer /> 
            // <SidebarContainer />  */}
         </div>
      )
   }
} 

export default Home; 