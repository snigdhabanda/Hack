

import React from "react";
import ReplyMessageForm from "./ReplyMessageForm";

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [this.props.message] };
  }

  componentDidMount(){
    const allMessages = [this.props.message]
    Object.values(this.props.messages).map((message) =>
    {
        if (message.parentMessageId && message.parentMessageId === this.props.message.id)
        {allMessages.push(message)}
    })
    this.setState({messages: allMessages}) 
  }

  componentDidUpdate(){
    if (this.props.threadMessages.length > 0){
      this.state.messages.concat(this.props.threadMessages)
    }
    console.log("updating")
  }
  
  
  render() {
    console.log(this.state.messages, "thread")
        const messageList = this.state.messages.concat(this.props.threadMessages).reverse().map((message, idx) => {
            let timeStampArray = new Date(`${message.createdAt}`).toLocaleString().split(" ")
            let timestamp = timeStampArray[1].slice(0,timeStampArray[1].length - 3) + " " + timeStampArray[2].toLowerCase()
        
        return (   
            <li className="message-box" key={message.id}>
                <div className="message-author">{this.props.users[message.authorId].displayName}
                        <p className="message-time">{timestamp}</p>
                </div>
                <p className="message-content">{message.body}</p>
            </li>)
        })
        return (
        <div className="thread-container">
            <div className="message-list" >{messageList}</div>
            <ReplyMessageForm currentUser={this.props.currentUser} parentMessageId={this.props.message.id} channelId={this.props.channelId}/>
            <button>Close</button>
        </div>
        )
  }
}

export default Thread;