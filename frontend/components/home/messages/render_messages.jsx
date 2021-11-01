import React from 'react'


class RenderMessages extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.user 

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        this.props.submitMessage(this.state)
    }

    update(field){
        return (e) => (this.setState({[field]: e.currentTarget.value}))
    }

    render() {
        //fetch all messages in that channel or dm 
        //
       
        return (
            <form >
                <textarea onChange={this.update('message')}></textarea>
                
                <button type="submit" onClick={this.handleSubmit}>Send</button>
               
            </form>
        )
    }
}

export default MessageForm


