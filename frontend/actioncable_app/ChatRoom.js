import React from "react";
import MessageForm from "./MessageForm.js";
import EditMessageForm from "./EditMessageForm"
import {getTime} from '../util/message_api_util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faSortDown, faPlus, faReply, faTrashAlt, faEdit} from '@fortawesome/fontawesome-free-solid'
import Thread from './Thread'



class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], threadMessages: [], updatingMessage: false, replying: false};
    this.bottom = React.createRef();
    this.channelQueue = [];
    
  }
  
  subscribeToChannel() {
    App.cable.subscriptions.create(
      { channel: "ChatChannel",
        id: this.props.currentView
    },
      {
        received: data => {
          switch (data.type) {
            case "createMessage":
                const message = {
                id: data.id,
                body: data.message,
                authorId: data.author_id,
                channelId: data.channel_id,
                createdAt: data.created_at  
                }
                this.props.createMessage(message) 
                this.setState({
                  messages: this.props.messages.reverse()
                });
            // case "editMessage":
            //   const editedMessage = {
            //     id: data.id,
            //     body: data.message,
            //     authorId: data.author_id,
            //     channelId: data.channel_id,
            //     createdAt: data.created_at  
            //     }
            case "deleteMessage":
              // this.props.deleteMessage(data.message)
              // this.setState({
              //   messages: this.props.messages.reverse()
              // });
            case "replyMessage":
                const replyMessage = {
                id: data.id,
                body: data.message,
                authorId: data.author_id,
                channelId: data.channel_id,
                createdAt: data.created_at,
                parentMessageId: data.parent_message_id  
                }
                this.props.createMessage(replyMessage) 
                let thread = this.state.threadMessages.slice().concat(replyMessage)
                this.setState({
                  threadMessages: thread
                })
            
            
          }
        },
        speak: function(data) {return this.perform("speak", data)},
        update: function(data) {return this.perform("update", data)},
        delete: function(data) {return this.perform("delete", data)},
        reply: function(data) {return this.perform("reply", data)}
      }
    )
    
  }

  unsubscribeFromChannel(){
    App.cable.disconnect()
  }
  

  loadMessages() {
    const messages = this.props.messages.reverse()
    this.setState({ messages: messages });
  }

  changeChannel(channelId) {
    //unsubscribe from previous channel 
    this.unsubscribeFromChannel()
    //calling RECEIVE_CHANNEL for viewreducer && loading messages
    this.props.fetchChannel(channelId).then(() => this.loadMessages()) 
    // this.loadMessages()
    this.subscribeToChannel()
  }

  // getTime(messageId){
  //   console.log("gettingtime")
  //   getTime(messageId);
  // }

  updateMessage(message){
    this.setState({updatingMessage: true})
    this.messageToUpdate = message; 
    
  }

  deleteMessage(message){
    console.log("deleting message")
    App.cable.subscriptions.subscriptions[0].delete({ message: message});
  }

  reply(message){
    this.setState({replying: true})
    this.replyMessage = message
  }
  
  render() {
    
    
    if (this.channelQueue.length === 0 || this.channelQueue[this.channelQueue.length - 1] !== this.props.currentView){
      this.channelQueue.push(this.props.currentView)
      this.changeChannel(this.props.currentView)
    }
    console.log("rendering in parent")
    const messageList = this.state.messages.map((message, idx) => {
      let timeStampArray = new Date(`${message.createdAt}`).toLocaleString().split(" ")
      // console.log(timeStampArray)
      let timestamp = timeStampArray[1].slice(0,timeStampArray[1].length - 3) + " " + timeStampArray[2].toLowerCase()
      console.log(this.state.threadMessages)
      if (!message.parentMessageId){
      return (
        <li className="message-box" key={message.id}>
          <div className="message-author">{this.props.users[message.authorId].displayName}
            <p className="message-time">{timestamp}</p>
          </div>
          <p className="message-content">{message.body}</p>
          <div className="replies">{`${this.props.messages.filter(stateMessage => stateMessage.parentMessageId === message.id).length} replies`}</div>
          
          {(this.state.updatingMessage && this.messageToUpdate.id === message.id) ? 
            <div><EditMessageForm 
            currentUser={this.props.currentUser} 
            channelId={this.props.currentView} 
            message={this.messageToUpdate} />{this.state.updatingMessage = false}
            </div>: ""
          }
          
          <div className="edit-delete-reply">
            <button className="update-message" onClick={this.updateMessage.bind(this, message)}>
              <FontAwesomeIcon className="edit-icon" icon={faEdit} />
            </button>
            <button className="delete-message" onClick={this.deleteMessage.bind(this, message)}>
              <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
            </button>
            <button className="reply-message" onClick={this.reply.bind(this, message)}>
              <FontAwesomeIcon className="reply-icon" icon={faReply} />
            </button>
          </div>
          
        </li>
        

      )};
    });
    return (
      <div className="channels-messages">
        <div className="channel-title">
            <div className="channel-arrow-container"><FontAwesomeIcon className="channel-arrow" icon={faSortDown} /> </div>
            Channels       
           <FontAwesomeIcon className="channel-plus" icon={faPlus} />
        </div>
       
        <ul className="channels-list">
          
          {Object.values(this.props.channels).map((channel) =>
              <li className="channel" onClick={this.props.fetchChannel.bind(this, channel.id)}>
                <FontAwesomeIcon className="hashtag" icon={faHashtag} />
                {channel.name}
              </li>
              
          )}
        </ul>
        
        <div className="messages-and-threads">
        <div className="message-list" >
          {this.props.channels && this.props.currentView ? 
          <div className="channel-name">
            {this.props.channels[this.props.currentView].name}
          </div> : ""}
          
          {messageList}
        </div>

        {this.state.replying || this.state.threadMessages.length > 0 ? 
        <div className="thread">
            <Thread users={this.props.users} currentUser={this.props.currentUser} channelId={this.props.currentView} threadMessages={this.state.threadMessages} message={this.replyMessage} messages={this.props.messages}/>
            {/* {this.state.replying = false} */}
          {/* 
          {this.state.threadMessages.pop()} */}
        </div> : ""
        }
        </div>
        <MessageForm currentUser={this.props.currentUser} channels={this.props.channels} channelId={this.props.currentView}/>
      </div>
    );
  }
}

export default ChatRoom;