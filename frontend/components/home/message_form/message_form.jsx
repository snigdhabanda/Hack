import React from 'react'
import RenderMessages from '../messages/messages_index'

class MessageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.message 

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    // displayMessage(message){
    //     return <RenderMessagesContainer message={message}  />
    // }

    handleSubmit(e){
        e.preventDefault()
        if (this.state.recipientId) this.props.submitMessage(this.state).then((message) => <RenderMessages message={message}  />)
    }

    

    handleInput(recipientName){
        return (e) => (
            this.updateUser(recipientName, e.currentTarget.value, this.searchUsers.bind(this, e.currentTarget.value))
        )
            
        
    }

    updateUser(field, value, search){
        this.setState({[field]: value})
        search()
    }

    updateBody(field){
        return (e) => (
            this.setState({[field]: e.currentTarget.value})
        )
        
    }

    searchUsers(value){
        const users = Object.values(this.props.users)
        users.map((user) => {
            if (user.displayName === value){
                this.state.recipientId = user.id 
                
            }
        })
    }

    render() {

        return (
            <form >
                <input type="text" onChange={this.handleInput('recipientName')} />
                
                <textarea value={this.state.body} onChange={this.updateBody('body')}></textarea>
                
                <button type="submit" onClick={this.handleSubmit}>Send</button>
               
            </form>
        )
    }
}

export default MessageForm


