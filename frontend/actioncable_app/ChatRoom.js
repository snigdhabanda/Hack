import React from "react";
import MessageForm from "./MessageForm.js";
import EditMessageForm from "./EditMessageForm"
import {getTime} from '../util/message_api_util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faSortDown, faPlus } from '@fortawesome/fontawesome-free-solid'



class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: []};
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
            case "message":
              //createmessage: only action creator
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
                })
            
          }
        },
        speak: function(data) {return this.perform("speak", data)},
        load: function() {return this.perform("load")}
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

  getTime(messageId){
    console.log("gettingtime")
    getTime(messageId);
  }

  updateMessage(message){
    this.setState({updatingMessage: true})
    console.log(this.state)
    this.message = message; 
    
  }
  
  render() {
    const {users} = this.props.users
    
    
    if (this.channelQueue.length === 0 || this.channelQueue[this.channelQueue.length - 1] !== this.props.currentView){
      this.channelQueue.push(this.props.currentView)
      this.changeChannel(this.props.currentView)
    }
    
    const messageList = this.state.messages.map((message, idx) => {
      console.log(this.state.messages)
      let timeStampArray = new Date(`${message.createdAt}`).toLocaleString().split(" ")
      let timestamp = timeStampArray[1].slice(0,timeStampArray[1].length - 3) + " " + timeStampArray[2].toLowerCase()
      console.log(this.state.messages[this.state.messages.length - 1])
      return (
        <li className="message-box" key={message.id}>
          <div className="message-author">{idx !== this.state.messages.length - 1 ? (message.authorId !== this.state.messages[idx + 1].authorId ? this.props.users[message.authorId].displayName : "") : this.props.users[message.authorId].displayName}
            <p className="message-time">{timestamp}</p>
          </div>
          <p className="message-content">{message.body}</p>
          <button onClick={this.updateMessage.bind(this, message)}></button>
        </li>
      );
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
        <div className="message-list" >{messageList}</div>
        <MessageForm currentUser={this.props.currentUser} channels={this.props.channels} channelId={this.props.currentView}/>
      </div>
    );
  }
}

export default ChatRoom;