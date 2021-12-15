import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'
import AddChannelMembersContainer from './add_channel_members_container'

class ChannelForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            channelName: "",
            channelDescription: "",
            search: "",
            showUsers: false,
            submittedMessage: false,
            channelMembers: false,
            filters: [],
            names: [],
            displayForm: this.props.displayForm
        }

        this.clickAddPeople = React.createRef();
        this.inputField = React.createRef();
        this.modalDisappear = React.createRef();
        this.timerId = 0; 
        // this.showUsers = this.showUsers.bind(this)
        // this.addPerson = this.addPerson.bind(this)
    }

    // displayMessage(message){
    //     return <RenderMessagesContainer message={message}  />
    // }

    handleSubmit(e){
        e.preventDefault()
        const channel = {
            name: this.state.channelName, 
            description: this.state.channelDescription,
            dm: false
        } 
        this.props.createChannel(channel)
        // this.state.memberIds.unshift(this.props.currentUser)
        // if (this.state.memberIds.length > 2) {
        //     
        this.setState({submittedMessage: true})
        
       
        // } 
    
    }

    componentDidUpdate(prevProps){
        if (prevProps.filteredUsers !== this.props.filteredUsers){
            this.setState({filters: Object.values(this.props.filteredUsers)})
        }
    }

    // componentDidUpdate(prevProps){
    //     console.log(Object.values(prevProps.channels)[Object.values(prevProps.channels).length - 1].id)
    //         this.state.memberIds.forEach((id, idx) => {
    //         console.log(this.props.dynamicView)
    //         let channelMember = {
    //             channelId: this.props.dynamicView.channelId,
    //             channelMemberId: id,
    //             creator: false 
    //         }
    //         if (id === this.props.currentUser) {channelMember.creator = true}
    //         this.props.createChannelMember(channelMember)
    //         this.state = {
    //             channelName: "",
    //             channelDescription: "",
    //             memberIds: [],
    //             showUsers: false
    //         }
    //     })
    // }

    
    debounce(){
        let search = this.state.search
        clearTimeout(this.timerId) 
        this.timerId = setTimeout(() => this.props.fetchFilteredUsers(search), 200)

    }

    

    update(field) {
        return e =>
          this.setState({ [field]: e.currentTarget.value });
    }

    updateSearch(field) {
        return e =>
          this.setState({ [field]: e.currentTarget.value },
        () => {this.debounce()});
    }

    // showUsers(){
    //     var peopleDiv = this.clickAddPeople.current
    //     console.log(peopleDiv.style)
    //     if (peopleDiv.style.display === "none") {
    //         console.log("working")
    //         peopleDiv.style.display = "block";
    //         this.setState({showUsers: true})
    //     } 

    // }

    addPerson(user){
        console.log(this.props.memberIds, user)
        if (this.props.memberIds.includes(user.id)){
            this.props.memberIds.pop(user.id)
        }
        else{
            this.props.memberIds.push(user.id)
        }
        console.log(this.props.memberIds)
   
    }

    modalDisappears(){
        this.setState({displayForm: !this.state.displayForm}, () => this.props.rerenderParent())
    }
    
    render() {
        return (
            <div>
            {this.state.displayForm ? 
            <form ref={this.modalDisappear} className="new-channel-form" onSubmit={this.handleSubmit.bind(this)} >
                <h2>Create a channel</h2>
                <p>Create a channel to communicate with anyone you're a fan of!</p>
                
                <div className="all-input-tags">
                <div className="name-box">
                <label>Name</label>
                    <input className="name-input" type="text" onChange={this.update('channelName')} />
                </div>

                <div className="channel-errors">{this.props.errors}</div>
                
                <div className="description-box">
                <label>Description (optional)</label>
                    <input className="description-input" type="text" onChange={this.update('channelDescription')} />
                </div>

                {/* <label>Topic (optional)
                    <input type="text" onChange={this.handleInput('recipientName')} />
                </label> */}
                <div className="add-people-box">
                <label>Add members</label>
                    <input className="search-box" type="text" value={this.state.search} placeholder="Enter a name" onChange={this.updateSearch('search')} />
                    
                        <div className="search-results">
                        {this.state.filters.length > 0 ? 
                        this.state.filters.map((user) => 
                            <div tabindex="0" className="user-search" onClick={this.addPerson.bind(this, user)}>
                            <img className="search-icon" width="30px" src={user.imageUrl}></img>
                            <div className="user-search-name">{user.displayName}</div>
                            
                            </div>
                        ) : ""}
                        
                       
                        {/* <ul>
                        {Object.values(this.props.users).map((user) => 
                    
                            <li tabindex={`${user.id}`} className="li-tag" ref={this.clickAddPeople} onClick={this.addPerson.bind(this, user)}>{user.displayName}</li>)
                        }
                        </ul> */}
                    </div>
                </div>
                </div>
                
                
                    {/* <div className="all-users" ref={this.clickAddPeople}>
                        {this.state.showUsers ? Object.values(this.props.users).map((user) => (
                            
                        )) : ""} */}
                    {/* </div> */}
                    {/* <input type="text" className="new-channel-members" ref={this.inputField} onChange={this.showUsers.bind(this)}  /> */}
                    {/* value ={this.state.memberIds.map(id => this.props.users[id].displayName)} */}
                    
                            
                {/* <input className="create" type="submit" /> */}
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>
                <button className="create" type="submit" >Create</button>

            </form>
            : ""}
            </div>
        )
    }
}

export default ChannelForm


