import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'

class DmForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            channelName: "",
            names: [],
            search: "",
            showUsers: false,
            submittedMessage: false,
            channelMembers: false,
            filters: [],
        }

        this.clickAddPeople = React.createRef();
        this.inputField = React.createRef();
        this.modalDisappear = React.createRef();
        this.timerId = 0; 

        // this.showUsers = this.showUsers.bind(this)
        // this.addPerson = this.addPerson.bind(this)
    }

    

    handleSubmit(e){
        e.preventDefault()
        let onlyNames = []
        let currentUsername = (this.props.users.filter(user => user.id === this.props.currentUser)[0]).displayName
        this.state.names.map(user => onlyNames.push(user.displayName))
        onlyNames.push(currentUsername)
        const channel = {
            name: onlyNames.join(", "), 
            dm: true
        } 
        this.props.createChannel(channel)
           
        this.setState({submittedMessage: true})
       
        
    
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
        this.modalDisappear.current.style.display = "none"; 
    }
    
    render() {
        
        return (
            <form ref={this.modalDisappear} className="new-channel-form" onSubmit={this.handleSubmit.bind(this)} >
                <h2>Direct message</h2>
                <p>Send a direct message to one or multiple people!</p>
                
                <div className="all-input-tags">
                
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
                    <div className="dm-names">
                        {this.state.names.map((user) => 
                            <div className="user-dm">
                            <li className="user-name">{user.displayName}</li>
                            <div className="x-dm" onClick={this.removeUser.bind(this, user)}>X</div>
                            </div>
                        )
                        }
                    </div>
                        
                    
                    </div>
                </div>
                </div>
                
                
                    
                <div className="modal-disappear" onClick={this.modalDisappears.bind(this)} >X</div>
                <button className="create dm" type="submit" >Create</button>

            </form>
        )
    }
}

export default DmForm


