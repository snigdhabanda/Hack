import React from 'react'


class ChannelForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            channelName: "",
            channelDescription: "",
            memberIds: [],
            showUsers: false}

        // this.showUsers = this.showUsers.bind(this)
        // this.addPerson = this.addPerson.bind(this)
    }

    // displayMessage(message){
    //     return <RenderMessagesContainer message={message}  />
    // }

    handleSubmit(e){
        e.preventDefault()
        this.state.memberIds.shift(this.props.currentUser)
        // if (this.state.memberIds.length > 2) {
            const channel = {
                name: this.state.channelName, 
                description: this.state.channelDescription
            }
            this.props.createChannel(channel).then((channel) => console.log(channel))
            // let channelMember = {
            //     channelId,
            //     channelMemberId,
            //     creator: false 
            // }
            // this.state.memberId.forEach((id, idx) => {
            //     channelMember.channelId = this.props.currentViewId
            //     channelMember.channelMemberId = id
            //     if (idx === 0) channelMember.creator = true 
            //     this.props.createChannelMember(channelMember)
            //     this.setState = {channel: {name: ""},
            //         recipientName: ""}
            // })
             
        // }
    }

    // handleUserInput(recipientName){
    //     return (e) => (
    //         this.updateUser( recipientName,
    //             e.currentTarget.value,
    //             this.searchUsers.bind(this, e.currentTarget.value))
    //     )     
        
    // }

    // updateUser(name, value, searchUsers){
    //     this.setState({channel: {name: value}})
    //     searchUsers()
    // }

    // searchUsers(value){
    //     this.props.users.map((user) => {
    //         if (user.displayName === value){
    //             this.props.memberId << user.id 
    //         }
    //     })
    // }

    // updateName(field){
    //     return (e) => (
    //         this.setState({[field]: e.currentTarget.value})
    //     ) 
    // }

    update(field) {
        console.log(field)
        return e =>
          this.setState({ [field]: e.currentTarget.value });
    }

    // showUsers(){
    //     var peopleDiv = document.getElementById("add-people");
    //     if (peopleDiv.style.display === "none") {
    //         peopleDiv.style.display = "block";
    //         this.setState({showUsers: true})
    //     } 

    // }

    addPerson(user){

    }
    
    render() {
        console.log(this.state)
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Name
                    <input type="text" onChange={this.update('channelName')} />
                </label>

                <label>Description (optional)
                    <input type="text" onChange={this.update('channelDescription')} />
                </label>

                {/* <label>Topic (optional)
                    <input type="text" onChange={this.handleInput('recipientName')} />
                </label> */}

                {/* <label>Add people
                    <input type="text" onClick={this.showUsers()} value = {this.state.memberIds.map(id => this.props.users[id].displayName)} />
                    <div id="all-users">
                        {showUsers ? Object.values(this.props.users).map((user) => (
                            <li onClick={this.addPerson(user)}>{user.displayName}</li>
                        )) : ""}
                    </div>
                </label> */}
                                
                <input type="submit" />
               
            </form>
        )
    }
}

export default ChannelForm


