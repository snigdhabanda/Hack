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

    

    handleAdd(user){
        this.addPerson(user)
        let includeName = false;
        this.state.names.map(member => {
            if (member.displayName === user.displayName){
                includeName = true;
            }
        })
        if (!includeName) this.setState({names: this.state.names.concat([user])})
    }

    addPerson(user){
        if (!this.props.memberIds.includes(user.id)){
            this.props.memberIds.push(user.id)
        }
       
    }

    removeUser(user){
        let id = this.props.memberIds.filter(userId => userId === user.id)[0]
        let idx = this.props.memberIds.indexOf(id)
        this.props.memberIds.splice(idx, 1)

        let member = this.state.names.filter(member => member.id === user.id)[0]
        let memberId = this.state.names.indexOf(member)
        this.state.names.splice(memberId, 1)
        
        this.setState({names: this.state.names})


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
                            <div tabindex="0" className="user-search" onClick={this.handleAdd.bind(this, user)}>
                            <img className="search-icon" width="30px" src={user.imageUrl}></img>
                            <div className="user-search-name">{user.displayName}</div>
                            
                            </div>
                        ) : ""}

                    <div className="dm-names-channel-form">
                        {this.state.names.map((user) => 
                            <div className="user-dm">
                            <li className="user-name">{user.displayName}</li>
                            <div className="x-dm" onClick={this.removeUser.bind(this, user)}>X</div>
                            </div>
                        )
                        }
                    </div>
                        
                       
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


