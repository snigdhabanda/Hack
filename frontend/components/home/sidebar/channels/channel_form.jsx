import React from 'react'


class ChannelForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {channel: {name: ""},
                    recipientName: ""}

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUserInput = this.handleUserInput.bind(this)
    }

    displayMessage(message){
        return <RenderMessagesContainer message={message}  />
    }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.memberId.length > 2) {
            this.props.createChannel(this.state)
            let channelMember = {
                channelId,
                channelMemberId,
                creator: false 
            }
            this.state.memberId.forEach((id, idx) => {
                channelMember.channelId = this.props.currentViewId
                channelMember.channelMemberId = id
                if (idx === 0) channelMember.creator = true 
                this.props.createChannelMember(channelMember)
                this.setState = {channel: {name: ""},
                    recipientName: ""}
            })
             
        }
    }

    handleUserInput(recipientName){
        return (e) => (
            this.updateUser( recipientName,
                e.currentTarget.value,
                this.searchUsers.bind(this, e.currentTarget.value))
        )     
        
    }

    updateUser(name, value, searchUsers){
        this.setState({channel: {name: value}})
        searchUsers()
    }

    searchUsers(value){
        this.props.users.map((user) => {
            if (user.displayName === value){
                this.props.memberId << user.id 
            }
        })
    }

    updateName(field){
        return (e) => (
            this.setState({[field]: e.currentTarget.value})
        ) 
    }

    
    render() {
        return (
            <form >
                <label>Name
                    <input type="text" onChange={this.updateName('name')} />
                </label>

                {/* <label>Description (optional)
                    <input type="text" onChange={this.handleInput('recipientName')} />
                </label>

                <label>Topic (optional)
                    <input type="text" onChange={this.handleInput('recipientName')} />
                </label> */}

                <label>Add people
                    <input type="text" onChange={this.handleUserInput('recipientName')} />
                </label>
                                
                <button type="submit" onClick={this.handleSubmit}>Create</button>
               
            </form>
        )
    }
}

export default ChannelForm


