import React from 'react'


class MessageForm extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.message 

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        if (recipientId) this.props.submitMessage(this.state)
    }

    handleInput(recipientName){
        return (e) => (
            // console.log(e.currentTarget.value)
            this.update(recipientName, e)
            // .then(this.searchUsers(e))
        )
            
        
    }

    update(field, event){
        console.log(field, event)
        this.setState({[field]: event.currentTarget.value})
    }

    searchUsers(e){
        const users = Object.values(this.props.users)
        users.map((user) => {
            if (user.displayName === e.currentTarget.value){
                this.state.recipientId = user.id 
            }
        })
    }

    render() {

        return (
            <form >
                <input type="text" onChange={this.handleInput('recipientName')} />
                
                {/* <textarea value={this.state.body} onChange={this.update('body')}></textarea> */}
                
                <button type="submit" onClick={this.handleSubmit}>Send</button>
               
            </form>
        )
    }
}

export default MessageForm


