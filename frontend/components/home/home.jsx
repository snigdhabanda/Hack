import React from 'react'
import ChannelsIndexContainer from './sidebar/channels/channels_index_container'
import UsersIndexContainer from '.././home/sidebar/users/users_index_container'

class Home extends React.Component{
   constructor(props){
      super(props)
      this.state = {
         showDropdown: false, 
         showModal: false,
         displayName: this.props.displayName,
         email: this.props.email 
      }
   }

   handleDropDrown(e){
      e.preventDefault()
      if (!this.state.showDropdown) this.setState({showDropdown: true})
      else {
         this.setState({showDropdown: false})
      }
   }

   handleLogout(e){
      e.preventDefault()
      this.props.logoutUser()
   }

   editProfile(e){
      e.preventDefault()
      if (!this.state.showModal) this.setState({showModal: true})
     
   }

   update(field){
      return (e) => this.setState({[field]: e.currentTarget.value})
   }

   closeModal(){
      this.setState({showModal: false})
   }

   handleSubmit(e){
      e.preventDefault()
      this.props.updateUser({
         id: this.props.currentUserId,
         email: this.state.email, 
         displayName: this.state.displayName})
   }

   render(){
      return (
         <div> 
            <nav className="header-nav">
               {/* UserComponent */}
               {/* SearchBar */}
               <a className="github" href="https://github.com/snigdhabanda/Hack" >
                  <img className="github-img" width="40px" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/github.png?raw=true"></img>
               </a>
               <a className="linkedin" href="https://www.linkedin.com/in/snigdhabanda0/">
                  <img className="linkedin-img" width="40px" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/linkedin.png?raw=true" ></img>
               </a>
            <img onClick={this.handleDropDrown.bind(this)} tabindex="0" className="profile-component" src={`${this.props.users[this.props.currentUserId].imageUrl}`} /> 
            {this.state.showDropdown ? 
            <div className="profile-dropdown">
               <div onClick={this.handleLogout.bind(this)} className="logout">Logout</div>
               <div onClick={this.editProfile.bind(this)} className="edit-profile">Edit Profile</div>
            </div> : ""
            }

            {this.state.showModal ? 
            <form className="profile-form modal-background" onSubmit={this.handleSubmit.bind(this)}>
               <h2>Update Profile</h2>
               <div className="close-profile-modal" onClick={this.closeModal.bind(this)}>X</div>
                <div className="name-box">
                <label>Name</label>
                    <input className="name-input" value={this.state.displayName} type="text" onChange={this.update('displayName')} />
                </div>

                <div className="name-box">
                <label>Email</label>
                    <input className="name-input" value={this.state.email} type="text" onChange={this.update('email')} />
                </div>
                <button className="update-profile" type="submit">Update Profile</button>
            </form> : ""
         }

            
            </nav>
            <nav className="sidebar-nav" >
               <div className="sidebar-icon">
               <div className="dinner-party">Dinner Party</div>
               <img className="wine-glass" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/wine_glass.png?raw=true"></img>
               </div>
               <UsersIndexContainer /> 
               <ChannelsIndexContainer />  
               
            </nav>  
            

            {/* // <RenderMessagesContainer /> 
            // <SidebarContainer />  */}

      
         </div>
      )
   }
} 

export default Home; 