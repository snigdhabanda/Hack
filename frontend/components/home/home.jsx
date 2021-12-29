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
         email: this.props.email,
         search: "",
         filters: []
      }
      this.timerId = 0; 
   }

   componentDidMount(){
      this.props.fetchCurrentUser(this.props.currentUserId).then(() => 
      this.props.fetchChannel(this.props.channelId))
     
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
         displayName: this.state.displayName}).then(() => 
      this.setState({displayName: this.props.displayName,
         email: this.props.email,
         showModal: false}))
   }

   debounce(){
      let search = this.state.search
      clearTimeout(this.timerId) 
      this.timerId = setTimeout(() => this.props.fetchFilteredUsers(search), 200)

  }

   updateSearch(field) {
      return e =>
        this.setState({ [field]: e.currentTarget.value },
      () => {this.debounce()});
  }

  componentDidUpdate(prevProps){
   if (prevProps.filteredUsers !== this.props.filteredUsers){
       this.setState({filters: Object.values(this.props.filteredUsers)})
   }
}

   render(){
      return (
         <div> 
            <nav className="header-nav">
               {/* UserComponent */}
               {/* SearchBar */}
               <div className="search-header">
                  <input className="search-box" type="text" value={this.state.search} placeholder="Search for members here" onChange={this.updateSearch('search')} />
                  <div className="search-results-header">
                           {this.state.filters.length > 0 && this.state.search.length > 0 ? 
                           this.state.filters.map((user) => 
                              <div className="user-search-header">
                              <img className="search-icon" width="30px" src={user.imageUrl}></img>
                              <div className="user-search-name-header">{user.displayName}</div>
                              </div>
                           ) : ""}
                  </div>
               </div>
               
               <div className="home-imgs">
                  <a className="github" href="https://github.com/snigdhabanda/Hack" target="_blank">
                     <img className="github-img" width="45px" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/github.png?raw=true"></img>
                  </a>

                  <a className="linkedin" href="https://www.linkedin.com/in/snigdhabanda0/" target="_blank">
                  <img className="linkedin-img" width="45px" src="https://github.com/snigdhabanda/Hack/blob/refactoring_channels/app/assets/images/linkedin-transparent.png?raw=true" ></img>
                  </a>
               </div>
               
            <img onClick={this.handleDropDrown.bind(this)} tabindex="0" className="profile-component" src={`${this.props.users[this.props.currentUserId].imageUrl}`} /> 
            {this.state.showDropdown ? 
            <div className="profile-dropdown">
               <div onClick={this.handleLogout.bind(this)} className="logout">Logout</div>
               <div onClick={this.editProfile.bind(this)} className="edit-profile">Edit Profile</div>
            </div> : ""
            }

            {this.state.showModal ? 
            <form className="profile-form" onSubmit={this.handleSubmit.bind(this)}>
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
                <div className="update-profile-errors">{this.props.errors}</div>
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
            

            

      
         </div>
      )
   }
} 

export default Home; 