

import React from "react";
import ReplyMessageForm from "./ReplyMessageForm";

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.closeThread = React.createRef();
  }

  getReplies(){
    const allMessages = [this.props.message]
    Object.values(this.props.messages).map((message) =>
    {
        if (message.parentMessageId && message.parentMessageId === this.props.message.id)
        {allMessages.push(message)}
    })
    return allMessages
  }

  componentDidMount(){
    this.setState({messages: this.getReplies()}) 
  }

  componentDidUpdate(prevProps){
    console.log("im in cdu")
    if (prevProps.threadMessages !== this.props.threadMessages){
      this.setState({messages: this.state.messages.concat(this.props.threadMessages)})
    }
    if (prevProps.message !== this.props.message){
      this.setState({messages: this.getReplies()})
    }
    
  }
  modalDisappears(){
    this.closeThread.current.style.display = "none"; 
  }
  
  
  render() {

        const messageList = this.state.messages.length > 0 ? this.state.messages.reverse().map((message, idx) => {
            let timeStampArray = new Date(`${message.createdAt}`).toLocaleString().split(" ")
            let timestamp = timeStampArray[1].slice(0,timeStampArray[1].length - 3) + " " + timeStampArray[2].toLowerCase()
        
        return (   
            <li className="message-box" key={message.id}>
                {/* <div className="message-author">{this.props.users[message.authorId].displayName}
                        <p className="message-time">{timestamp}</p>
                </div> */}
                <p className="message-content">{message.body}</p>
            </li>)
        }) : ""
        return (
        <div ref={this.closeThread} className="thread-container">
            <div className="thread-name">{`Thread #${this.props.channels[this.props.channelId].name.toLowerCase()}`}</div>
            
            <div className="message-list" >{messageList}</div>
            <ReplyMessageForm currentUser={this.props.currentUser} parentMessageId={this.props.message.id} channelId={this.props.channelId}/>
            <button className="close-thread" onClick={this.modalDisappears.bind(this)}>X</button>
        </div>
        )
  }
}

export default Thread;