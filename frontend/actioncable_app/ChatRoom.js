import React from "react";
import MessageForm from "./MessageForm.js";
import EditMessageForm from "./EditMessageForm"
import {getTime} from '../util/message_api_util'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faSortDown, faPlus, faReply, faTrashAlt, faEdit, faUser} from '@fortawesome/fontawesome-free-solid'
import Thread from './Thread'
import ChannelForm from './../components/home/sidebar/channels/channel_form'
import AddChannelMembers from "../components/home/sidebar/channels/add_channel_members.jsx";
import ShowChannel from "../components/home/sidebar/channels/show_channel.jsx";
import ChannelFormContainer from "../components/home/sidebar/channels/channel_form_container"
import DmFormContainer from "../components/home/sidebar/dm_form_container"
import EditChannelFormContainer from "../components/home/sidebar/channels/edit_channel_form_container"

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], 
      threadMessages: [], 
      updatingMessage: false, 
      replying: false, 
      displayForm: false, 
      displayEditForm: false,
      displayDmForm: false, 
      submittingMessage: 
      false, memberIds: []};
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

          if (data.type === "createMessage"){
            const message = {
              id: data.id,
              body: data.message,
              authorId: data.author_id,
              channelId: data.channel_id,
              createdAt: data.created_at  
              }
              this.props.createMessage(message) 
              this.setState({
                messages: this.props.messages
              })
          }
          else if (data.type==="deleteMessage"){
              this.props.deleteMessage(data.message)
              this.setState({
                messages: this.props.messages
              })
            }
          else if (data.type=== "replyMessage"){
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

  // componentDidMount(){
  //   this.props.fetchCurrentUser()
  // }

  rerenderParent = () => {
    if (this.state.displayForm){
      this.setState({displayForm: false})
    }
    if (this.state.displayEditForm){
      
      this.setState({displayEditForm: false})
    }
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.channels !== this.props.channels){
      this.setState({submittingMessage: true})
    }
  }

  unsubscribeFromChannel(){
    App.cable.disconnect()
  }
  

  loadMessages() {
    const messages = this.props.messages
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
  showMembers(){

  }

  deleteMessage(message){
    App.cable.subscriptions.subscriptions[0].delete({ message: message});
  }

  reply(message){
    this.setState({replying: true})
    this.replyMessage = message
  }

  handleClick(e){
    e.preventDefault()
    if (!this.state.displayForm) {this.setState({displayForm: true})}

  }

  handleDm(e){
    e.preventDefault()
    if (!this.state.displayDmForm) {this.setState({displayDmForm: true})}
  }

  editFormAppears(e){
    e.preventDefault()
    this.setState({displayEditForm: true})

  }

  handleDelete(channelId){
    this.props.deleteChannel(channelId).then(() => this.props.fetchCurrentUser(this.props.currentUser))
    //need to close modal
    
}
  
  render() {
    if (this.channelQueue.length === 0 || this.channelQueue[this.channelQueue.length - 1] !== this.props.currentView){
      this.channelQueue.push(this.props.currentView)
      this.changeChannel(this.props.currentView)
    }

    
    
    const messageList = this.state.messages.map((message, idx) => {
      let timeStampArray = new Date(`${message.createdAt}`).toLocaleString().split(" ")
      let timestamp = timeStampArray[1].slice(0,timeStampArray[1].length - 3) + " " + timeStampArray[2].toLowerCase()
      let numReplies = this.props.messages.filter(stateMessage => stateMessage.parentMessageId === message.id).length
      if (!message.parentMessageId){
      return (
        <li className="message-box" key={message.id}>
          <div className="flex-box-img-content">
            {this.props.users[message.authorId].imageUrl !== "test" && 
            this.props.users[message.authorId].imageUrl
            ? 
          <img className="author-icon" src={`${this.props.users[message.authorId].imageUrl}`} />
          : ""
        }
            <div className="holds-message-properties">
              <div className="message-author">{this.props.users[message.authorId].displayName}
                <p className="message-time">{timestamp}</p>
              </div>
              <p className="message-content">{message.body}</p>
              <div onClick={this.reply.bind(this, message)} className="replies">{numReplies > 0 ? numReplies === 1  ?  `${numReplies} reply` : `${numReplies} replies` : ""}</div>
            </div>
          </div>

          {(this.state.updatingMessage && this.messageToUpdate.id === message.id) ? 
            <div><EditMessageForm 
            currentUser={this.props.currentUser} 
            channelId={this.props.currentView} 
            message={this.messageToUpdate} />{this.state.updatingMessage = false}
            </div>: ""
          }
        
          <div className="edit-delete-reply">
            {this.props.users[message.authorId].id === this.props.currentUser ?
            <button className="update-message" onClick={this.updateMessage.bind(this, message)}>
              <FontAwesomeIcon className="edit-icon" icon={faEdit} />
            </button> : ""
            }
            {this.props.users[message.authorId].id === this.props.currentUser ? 
              <button className="delete-message" onClick={this.deleteMessage.bind(this, message)}>
              <FontAwesomeIcon className="trash-icon" icon={faTrashAlt} />
            </button> : ""
            } 
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
            Channels       
           <FontAwesomeIcon onClick={this.handleClick.bind(this)} className="channel-plus" icon={faPlus} />
        </div>

        
        <ul className="channels-list">
        {Object.values(this.props.channels).filter(channel => !channel.dm).map((channel) =>(
              <li className="channel" tabIndex={`${channel.id}`} onClick={this.props.fetchChannel.bind(this, channel.id)}>
                <FontAwesomeIcon className="hashtag" icon={faHashtag} />
                {channel.name}
              </li>
        ))}
        </ul>
        
        
        
        <div className="dm-title">Direct Messages
        <FontAwesomeIcon onClick={this.handleDm.bind(this)} className="channel-plus" icon={faPlus} />
        </div>
        <ul className="dms-list">
        {Object.values(this.props.channels).filter(channel => channel.dm).map((channel) =>(
              <div className="holds-dm-name" tabindex={`${channel.id}`}>
              <li className="dm-message" onClick={this.props.fetchChannel.bind(this, channel.id)}>
                {channel.name}
                {/* {channel.name.split(", ").includes(this.props.users[this.props.currentUser].displayName.toLowerCase()) ?
                channel.name.split(", ").slice(channel.name.split(", ").indexOf(this.props.users[this.props.currentUser].displayName), 1): channel.name}
                 */}
              </li>
              <div className="dm-x-hover" onClick={this.handleDelete.bind(this, channel.id)}>X</div>
              
              </div>
            
          ))}
          
        </ul>
        
        

        {this.state.displayForm && !this.state.displayEditForm ? 
                <div className="modal-background">
                    <ChannelFormContainer 
                    memberIds={this.state.memberIds} 
                    createChannelMember={this.props.createChannelMember} 
                    channels={this.props.channels} 
                    users={this.props.users} 
                    currentView = {this.props.currentView} 
                    createChannel={this.props.createChannel} 
                    fetchChannel={this.props.fetchChannel}
                    displayForm={this.state.displayForm}
                    rerenderParent={this.rerenderParent}
                    />
                    
                </div>
                
                    
                : null}
        {/* <button onClick={this.handleClick.bind(this)}>New Channel</button> */}

        {this.state.displayEditForm && !this.state.displayForm ? 
             (Object.values(this.props.channelMembers).filter(channelMember =>
              channelMember.memberId === this.props.currentUser && 
              channelMember.channelId === this.props.currentView)[0]).creator ? 
                <div className="modal-background">
                    <EditChannelFormContainer
                    
                    channel={this.props.channels[this.props.currentView]} 
                    currentUser={this.props.currentUser}
                    updateChannel={this.props.updateChannel} 
                    fetchCurrentUser={this.props.fetchCurrentUser}
                    errors={this.props.errors}
                    deleteChannel={this.props.deleteChannel}
                    rerenderParent={this.rerenderParent}
                    displayEditForm={this.state.displayEditForm}
                    />
                </div>
                    
                : <div className="modal-background"><ShowChannel 
                    channel={this.props.channels[this.props.currentView]} 
                    currentUser={this.props.currentUser}
                    currentView={this.props.currentView}
                    users={Object.values(this.props.users)}
                    channelMembers={Object.values(this.props.channelMembers)}
                    leaveChannel={this.props.leaveChannel}
                    fetchCurrentUser={this.props.fetchCurrentUser}
                    rerenderParent={this.rerenderParent}
                    displayEditForm={this.state.displayEditForm}
                /></div>
                : null}
        {this.state.submittingMessage ? 
                <div><AddChannelMembers createChannelMember = {this.props.createChannelMember} currentUser = {this.props.currentUser} currentView={this.props.currentView} memberIds={this.state.memberIds} />
                {this.state.submittingMessage = false}
                {this.state.memberIds = []}
                </div> : ""
                
        }

          {(this.state.displayDmForm && !this.state.DisplayEditForm && !this.state.displayForm) ? 
            <div className="modal-background"><DmFormContainer
                    memberIds={this.state.memberIds} 
                    createChannelMember={this.props.createChannelMember} 
                    channels={this.props.channels} 
                    users={this.props.users} 
                    currentView = {this.props.currentView} 
                    createChannel={this.props.createChannel} 
                    fetchChannel={this.props.fetchChannel}
            />
            {this.state.displayDmForm = false}
            </div>: ""
          } 
          
             
        
        <div className="messages-and-threads">
        <div className="message-list" >
          {this.props.channels && this.props.currentView ? 
          <div className="channel-name">
            <div onClick= {this.editFormAppears.bind(this)} 
            className="name-of-channel">{this.props.channels[this.props.currentView].name}</div>
            <div onClick={this.showMembers.bind(this)} className = "num-members">
              {Object.values(this.props.channelMembers).length}
              <FontAwesomeIcon className="user-icon" icon={faUser} />
              </div>
            
          </div> : ""}
          <div id="for-scroll">
          {messageList}
          </div>
        </div>

        {this.state.replying || this.state.threadMessages.length > 0 ? 
        <div className="thread">
            <Thread users={this.props.users} currentUser={this.props.currentUser} channels={this.props.channels} channelId={this.props.currentView} threadMessages={this.state.threadMessages} message={this.replyMessage} messages={this.props.messages}/>
            {this.state.threadMessages = []}
            {this.state.replying = false}
            
        </div> : ""
        }
        </div>
        <MessageForm currentUser={this.props.currentUser} channels={this.props.channels} channelId={this.props.currentView}/>
      </div>
    );
  }
}

export default ChatRoom;